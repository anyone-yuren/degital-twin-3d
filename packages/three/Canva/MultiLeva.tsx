import { LevaPanel, useControls as useControlsImpl, useCreateStore } from 'leva';

export function Panel({ selected }) {
  return (
    <LevaPanel
      store={selected[0]?.userData.store}
      titleBar={{ title: selected.map(() => '●').join(' ') }}
    />
  );
}

export function useControls(selected, props) {
  const store = useCreateStore();
  const isFirst = selected[0] === store;
  // Hacky workaround to trick Leva into being able to handle mutiple stores ...
  // The idea is basically that each panel has its own store and the active (first)
  // panel just forwards its values to the other selected ones. It hides all props
  // that are not shared among the selected panels.
  const materialProps = useControlsImpl(
    Object.keys(props).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          ...props[key],
          transient: false,
          onChange: (value, path, ctx) =>
            !ctx.initial &&
            isFirst &&
            selected.length > 1 &&
            selected.forEach((s, i) => i > 0 && s.setValueAtPath(path, value)),
          render: (get) => selected.length === 1 || selected.every((store) => store.getData()[key]),
        },
      }),
      {}
    ),
    { store },
    [selected]
  );
  return [store, materialProps];
}
