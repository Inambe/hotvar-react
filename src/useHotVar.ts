import { HotVar } from "hotvar-js";
import { Values, Config } from "hotvar-js/dist/HotVar";
import { useEffect, useRef, useState } from "react";

function useHotVar({
  vars: defaultVars,
  hotVarConfig = {},
}: {
  vars: Values;
  hotVarConfig?: Partial<Config>;
}) {
  const [values, setValues] = useState<Values>(defaultVars);
  const hv = useRef<HotVar | null>(null);

  useEffect(() => {
    if (values) {
      hv.current = new HotVar({
        ...hotVarConfig,
        mode: "explicit",
        vars: Object.keys(values),
        onChange([varName, value]) {
          values[varName] = value;
          setValues({ ...values });
        },
      });
    }
    return () => hv.current?.destroy();
  }, []);

  return { values };
}

export default useHotVar;
