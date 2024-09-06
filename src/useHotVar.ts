import { HotVar } from "hotvar-js";
import { Values, VarType, Config } from "hotvar-js/dist/HotVar";
import { useEffect, useRef, useState } from "react";

function useHotVar({
  vars: defaultVars,
  hotVarConfig = {},
}: {
  vars: {
    [key: string]: {
      type: VarType;
      placeholder: string | number | boolean;
    };
  };
  hotVarConfig?: Partial<Config>;
}) {
  const [vars, _] = useState(defaultVars);
  const [values, setValues] = useState<Values>({});
  const hv = useRef<HotVar | null>(null);

  useEffect(() => {
    if (vars) {
      hv.current = new HotVar({
        ...hotVarConfig,
        mode: "explicit",
        vars: Object.keys(vars),
        onChange([varName, value]) {
          values[varName] = value;
          setValues({ ...values });
        },
      });
      const newValues = { ...values };
      Object.keys(vars).forEach((varName) => {
        newValues[varName] = newValues[varName] ?? {
          type: vars[varName].type,
          value: vars[varName].placeholder,
        };
      });
      setValues({ ...newValues });
    }
    return () => hv.current?.destroy();
  }, [vars]);

  return { values };
}

export { useHotVar };
