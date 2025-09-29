import { KinWin as BaseKinWin } from './manipulator';

// Extend the base class
declare module './manipulator' {
  interface KinWin {
    serialize(): Record<string, string>;
    val(): string;
    val(value: string): this;
  }
}

// Implement the methods
BaseKinWin.prototype.serialize = function () {
  const form = this.elements[0] as HTMLFormElement;
  const formData = new FormData(form);
  const data: Record<string, string> = {};

  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  return data;
};

BaseKinWin.prototype.val = function (value?: string) {
  if (value === undefined) {
    const el = this.elements[0] as HTMLInputElement;
    return el.value || '';
  }
  this.elements.forEach((el) => {
    if (el instanceof HTMLInputElement) {
      el.value = value;
    }
  });
  return this;
} as {
  (this: BaseKinWin): string;
  (this: BaseKinWin, value: string): BaseKinWin;
};
