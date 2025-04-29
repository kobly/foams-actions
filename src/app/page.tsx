import TweetList from "@/components/TweetList";
import { getInitialTweets } from "../service/userService";

export default async function MainPage() {
  const tweets = await getInitialTweets();
  return (
    <div className="p-5">
      <TweetList initialTweets={tweets} />
    </div>
  );
}
