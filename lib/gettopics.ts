import { ITopic } from "../interfaces";
import TopicsTR from "../public/rawraw_topics_tr.json";
import TopicsENG from "../public/rawraw_topics_eng.json";

export type Lang = "tr" | "en";

export default function getTopics(lang: Lang): ITopic[] {
  if (lang == "tr") {
    return TopicsTR;
  }
  return TopicsENG;
}
