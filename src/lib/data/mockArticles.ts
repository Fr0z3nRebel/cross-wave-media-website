import type { Article } from "@/types";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Faith in the Public Square: Navigating Division with Grace",
    excerpt:
      "How biblical wisdom can inform our engagement with contentious political and cultural debates without compromising conviction or compassion.",
    content: null,
    readingTime: 8,
    linkedScripture: [
      {
        reference: "Romans 12:18",
        text: "If it is possible, as far as it depends on you, live at peace with everyone.",
      },
      {
        reference: "1 Peter 3:15",
        text: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.",
      },
    ],
    author: { name: "Dr. Sarah Chen", avatar: "/avatars/sarah-chen.jpg" },
    category: "Analysis",
    status: "Published",
  },
  {
    id: "2",
    title: "Global Displacement and the Call to Welcome the Stranger",
    excerpt:
      "As refugee crises intensify worldwide, we explore what Scripture teaches about hospitality, justice, and the dignity of those seeking safety.",
    content: null,
    readingTime: 6,
    linkedScripture: [
      {
        reference: "Hebrews 13:2",
        text: "Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it.",
      },
      {
        reference: "Leviticus 19:34",
        text: "The foreigner residing among you must be treated as your native-born. Love them as yourself.",
      },
    ],
    author: { name: "Marcus Williams", avatar: "/avatars/marcus-williams.jpg" },
    category: "News",
    status: "Published",
  },
  {
    id: "3",
    title: "Morning Light: Restoring Hope When the World Feels Heavy",
    excerpt:
      "A devotional reflection on finding spiritual renewal and perspective during seasons of exhaustion and uncertainty.",
    content: null,
    readingTime: 4,
    linkedScripture: [
      {
        reference: "Lamentations 3:22–23",
        text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.",
      },
    ],
    author: { name: "Rev. Emily Foster", avatar: "/avatars/emily-foster.jpg" },
    category: "Devotional",
    status: "Published",
  },
  {
    id: "4",
    title: "Technology, Truth, and the Cultivation of Wisdom",
    excerpt:
      "In an age of AI and deepfakes, how do we steward our attention and discern what is true? Ancient wisdom meets modern challenges.",
    content: null,
    readingTime: 10,
    linkedScripture: [
      {
        reference: "Philippians 4:8",
        text: "Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
      },
      {
        reference: "Proverbs 4:7",
        text: "The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.",
      },
    ],
    author: { name: "Dr. Sarah Chen", avatar: "/avatars/sarah-chen.jpg" },
    category: "Analysis",
    status: "Published",
  },
  {
    id: "5",
    title: "Election Integrity and Civic Responsibility",
    excerpt:
      "Examining the biblical foundations for participation in democratic processes and the importance of faithful citizenship.",
    content: null,
    readingTime: 7,
    linkedScripture: [
      {
        reference: "Jeremiah 29:7",
        text: "Seek the peace and prosperity of the city to which I have carried you into exile. Pray to the Lord for it.",
      },
    ],
    author: { name: "Marcus Williams", avatar: "/avatars/marcus-williams.jpg" },
    category: "News",
    status: "Published",
  },
  {
    id: "6",
    title: "Abide: Finding Stillness in the Storm",
    excerpt:
      "When anxiety crowds in, Jesus invites us to remain in him. A reflection on John 15 and the practice of abiding.",
    content: null,
    readingTime: 5,
    linkedScripture: [
      {
        reference: "John 15:5",
        text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.",
      },
      {
        reference: "Psalm 46:10",
        text: "Be still, and know that I am God.",
      },
    ],
    author: { name: "Rev. Emily Foster", avatar: "/avatars/emily-foster.jpg" },
    category: "Devotional",
    status: "Published",
  },
  {
    id: "7",
    title: "Peacemakers in a Polarized Age",
    excerpt:
      "What does it look like to be a non-anxious presence and a peacemaker when every headline seems designed to divide?",
    content: null,
    readingTime: 9,
    linkedScripture: [
      {
        reference: "Matthew 5:9",
        text: "Blessed are the peacemakers, for they will be called children of God.",
      },
      {
        reference: "James 1:19",
        text: "Everyone should be quick to listen, slow to speak and slow to become angry.",
      },
    ],
    author: { name: "Dr. Sarah Chen", avatar: "/avatars/sarah-chen.jpg" },
    category: "Analysis",
    status: "Published",
  },
  {
    id: "8",
    title: "Micah 6:8 and the News Cycle",
    excerpt:
      "Practicing justice, loving mercy, and walking humbly with God while navigating breaking news and social media outrage.",
    content: null,
    readingTime: 6,
    linkedScripture: [
      {
        reference: "Micah 6:8",
        text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
      },
    ],
    author: { name: "Marcus Williams", avatar: "/avatars/marcus-williams.jpg" },
    category: "News",
    status: "Published",
  },
  {
    id: "9",
    title: "Daily Bread in a Digital Flood",
    excerpt:
      "A short devotional on returning to the simple practices of Scripture, prayer, and quiet in an always-online world.",
    content: null,
    readingTime: 3,
    linkedScripture: [
      {
        reference: "Matthew 6:11",
        text: "Give us today our daily bread.",
      },
      {
        reference: "Psalm 1:2",
        text: "Whose delight is in the law of the Lord, and who meditates on his law day and night.",
      },
    ],
    author: { name: "Rev. Emily Foster", avatar: "/avatars/emily-foster.jpg" },
    category: "Devotional",
    status: "Published",
  },
];

export function getMockArticles(): Article[] {
  return mockArticles;
}

