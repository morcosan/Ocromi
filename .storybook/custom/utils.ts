import faker from "faker";


export const selectOptions = [
   {
      label: 'Little Cat',
      value: 'little_cat',
   },
   {
      label: 'Big Cat',
      value: 'big_cat',
   },
   {
      label: 'Little Dog',
      value: 'little_dog',
   },
   {
      label: 'Big Dog',
      value: 'big_dog',
   },
   {
      label: 'Little Fish',
      value: 'little_fish',
   },
   {
      label: 'Big Fish',
      value: 'big_fish',
   },
];


export function generateRandomOptions(total: number, fakerCategory: string, fakerList: string) {
   const list: object[] = [];
   while (list.length < total) {
      // @ts-ignore
      const fake = faker[fakerCategory][fakerList]();
      // @ts-ignore
      if (!list.find(e => e.value === fake)) {
         list.push({
            value: fake,
            label: fake,
         });
      }
   }
   return list;
}
