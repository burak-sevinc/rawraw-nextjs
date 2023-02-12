import { ITopic } from "../interfaces";
import Topics from "../public/topics.json"

export default function getTopics(): ITopic[]{
    const topics = Topics;
    return topics;
}