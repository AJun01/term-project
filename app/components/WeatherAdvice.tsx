"use client";

import { useEffect, useState } from "react";
import { fetchApiResponse } from "../lib/fetchApiResponse";

interface WeatherAdviceProps {
  tempC: number;
  condition: string;
}

export default function WeatherAdvice({ tempC, condition }: WeatherAdviceProps) {
  const [advice, setAdvice] = useState<string>("");

  useEffect(() => {
    const messages = [
      {
        role: "system",
        content:
          "You are a friendly weather assistant. You read the current temperature (in °C) and the weather condition, " +
          "then you give a clothing recommendation. For example, if the temperature is 0°C or below, remind the user to wear " +
          "gloves and a hat. If it’s above, suggest sunglasses, a light jacket, etc. Keep it brief."
      },
      {
        role: "user",
        content: `The current weather is ${condition} with a temperature of ${tempC.toFixed(1)}°C.`
      }
    ];

    fetchApiResponse(messages).then(setAdvice);
  }, [tempC, condition]);

  return <p>{advice || "Loading advice…"}</p>;
}
