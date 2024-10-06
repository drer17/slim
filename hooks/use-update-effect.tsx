import { useEffect, useRef } from "react";

function useUpdateEffect(effect: React.EffectCallback, value: any) {
  const prevValue = useRef(value);

  useEffect(() => {
    if (JSON.stringify(prevValue.current) !== JSON.stringify(value)) {
      prevValue.current = value;
      return effect();
    }
  }, [value, effect]);
}

export default useUpdateEffect;
