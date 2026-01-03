import { useLanguage } from "@/context";
import translateText from "@/utils/translate";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function TranslatedText({
  children,
  style,
}: {
  children: string;
  style?: any;
}) {
  const { lang } = useLanguage();
  const [translated, setTranslated] = useState(children);

  useEffect(() => {
    let active = true;

    translateText(children, lang).then((result) => {
      if (active) setTranslated(result);
    });

    return () => {
      active = false;
    };
  }, [children, lang]);

  return <Text style={style}>{translated}</Text>;
}
