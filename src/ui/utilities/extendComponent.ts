import * as React from 'react';
import { appendFunction } from './appendFunction';

export function extendComponent<T extends React.Component>(parent: T, methods: { [key in keyof T]?: T[key] }): void {
  for (let name in methods) {
    if (methods.hasOwnProperty(name)) {
      parent[name] = appendFunction(parent, parent[name], methods[name]) as any;
    }
  }
}
