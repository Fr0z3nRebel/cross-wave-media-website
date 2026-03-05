export type ResourceType = "PDF" | "Guide" | "Book";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  downloadUrl: string;
  thumbnailUrl: string;
  /**
   * Optional rich content for the resource.
   * Stored as a JSON payload (e.g., markdown).
   */
  content?: unknown;
}

const resources = [
  {
    id: "21-day-digital-fast-guide",
    title: "The 21-Day Digital Fast Guide",
    type: "Guide",
    description:
      "A structured three-week journey to reset your relationship with technology through Scripture, reflection prompts, and community practices.",
    downloadUrl: "/resources/21-day-digital-fast-guide.pdf",
    thumbnailUrl: "/thumbnails/21-day-digital-fast-guide.jpg",
  },
  {
    id: "ecclesiology-modern-workplace",
    title: "Ecclesiology for the Modern Workplace",
    type: "Book",
    description:
      "A theological primer on how the gathered and scattered church can faithfully inhabit offices, studios, and remote teams in a post-Christian age.",
    downloadUrl: "/resources/ecclesiology-for-the-modern-workplace.epub",
    thumbnailUrl: "/thumbnails/ecclesiology-for-the-modern-workplace.jpg",
  },
  {
    id: "faithful-news-consumption",
    title: "Faithful News Consumption in an Age of Outrage",
    type: "PDF",
    description:
      "A practical framework for reading headlines, longform analysis, and social feeds through a Philippians 4:8 lens without disengaging from the world.",
    downloadUrl: "/resources/faithful-news-consumption.pdf",
    thumbnailUrl: "/thumbnails/faithful-news-consumption.jpg",
  },
  {
    id: "rule-of-life-for-creators",
    title: "Rule of Life for Christian Creators",
    type: "Guide",
    description:
      "A guided worksheet to help writers, designers, and filmmakers craft a rule of life that integrates calling, craft, and communion with God.",
    downloadUrl: "/resources/rule-of-life-for-christian-creators.pdf",
    thumbnailUrl: "/thumbnails/rule-of-life-for-christian-creators.jpg",
  },
  {
    id: "scripture-reading-plan-cultural-moments",
    title: "30-Day Scripture Reading Plan for Cultural Moments",
    type: "PDF",
    description:
      "Thirty curated passages with brief reflections to anchor your heart when navigating political cycles, global crises, and cultural flashpoints.",
    downloadUrl: "/resources/30-day-scripture-reading-plan-cultural-moments.pdf",
    thumbnailUrl: "/thumbnails/30-day-scripture-reading-plan-cultural-moments.jpg",
  },
  {
    id: "small-group-guide-media-discipleship",
    title: "Small Group Guide: Media Discipleship",
    type: "Guide",
    description:
      "Six-session discussion guide helping small groups discern their media habits together and develop shared practices for digital holiness.",
    downloadUrl: "/resources/small-group-guide-media-discipleship.pdf",
    thumbnailUrl: "/thumbnails/small-group-guide-media-discipleship.jpg",
  },
  {
    id: "prayer-liturgies-for-the-news-cycle",
    title: "Prayer Liturgies for the News Cycle",
    type: "PDF",
    description:
      "A collection of short written prayers and liturgies to pray before, during, and after engaging with breaking news and editorial commentary.",
    downloadUrl: "/resources/prayer-liturgies-for-the-news-cycle.pdf",
    thumbnailUrl: "/thumbnails/prayer-liturgies-for-the-news-cycle.jpg",
  },
  {
    id: "discipling-gen-z-online",
    title: "Discipling Gen Z in Online Spaces",
    type: "Book",
    description:
      "Research-informed insights and case studies for pastors, parents, and mentors seeking to shepherd digital-native teens toward resilient faith.",
    downloadUrl: "/resources/discipling-gen-z-in-online-spaces.epub",
    thumbnailUrl: "/thumbnails/discipling-gen-z-in-online-spaces.jpg",
  },
  {
    id: "sabbath-practices-for-knowledge-workers",
    title: "Sabbath Practices for Knowledge Workers",
    type: "Guide",
    description:
      "A practical guide to crafting tech-wise Sabbath rhythms for remote workers, executives, and freelancers in always-on environments.",
    downloadUrl: "/resources/sabbath-practices-for-knowledge-workers.pdf",
    thumbnailUrl: "/thumbnails/sabbath-practices-for-knowledge-workers.jpg",
  },
] satisfies Resource[];

export function getResources(): Resource[] {
  return resources;
}

