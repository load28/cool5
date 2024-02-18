import { arraysEqual } from './arrays-equal.ts';

type LocalState<TType, TValue> = {
  refs: (React.Ref<TType | TValue | null> | undefined)[];
  resolver?: (newValue: TType | TValue | null) => void;
};

const createResolver =
  <TType, TValue>(local: LocalState<TType, TValue>) =>
  (newValue: TType | TValue | null) => {
    for (const ref of local.refs) {
      if (typeof ref === 'function') {
        ref(newValue);
      } else if (ref) {
        (ref as unknown as React.MutableRefObject<TType | TValue | null | undefined>).current = newValue;
      }
    }
  };

export const createMergedRef = <TType, TValue = null>(value?: TValue) => {
  const local: LocalState<TType, TValue> = {
    refs: [] as LocalState<TType, TValue>['refs'],
  };

  return (...newRefs: (React.Ref<TType | null | TValue> | undefined)[]): ((newValue: TType | TValue | null) => void) => {
    if (!local.resolver || !arraysEqual(local.refs, newRefs)) {
      local.resolver = createResolver<TType, TValue>(local);
    }

    local.refs = newRefs;

    return local.resolver!;
  };
};
