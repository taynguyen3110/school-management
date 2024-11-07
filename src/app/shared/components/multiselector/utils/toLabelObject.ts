import { LabelObj } from '../../../types';

export function toLabelObject(obj: any[], keyId: string, keyLabel: string[]) {
  return obj.map((o) => {
    let labelObj: LabelObj = { id: '', label: '' };
    labelObj.id = o[keyId];
    labelObj.label = keyLabel.map((key) => o[key]).join(' ');
    return labelObj;
  });
}
