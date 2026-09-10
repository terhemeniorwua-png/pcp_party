import { PARTY_CHAIRMAN_RALLY_IMAGE } from "./images";

export const REGIONS = [
  { name: "North-West", states: ["Sokoto", "Zamfara", "Katsina", "Kaduna", "Kano", "Jigawa", "Kebbi"] },
  { name: "North-East", states: ["Borno", "Yobe", "Adamawa", "Gombe", "Bauchi", "Taraba"] },
  { name: "North-Central", states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT Abuja"] },
  { name: "South-West", states: ["Lagos", "Ogun", "Oyo", "Osun", "Ondo", "Ekiti"] },
  { name: "South-East", states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"] },
  { name: "South-South", states: ["Rivers", "Akwa Ibom", "Cross River", "Bayelsa", "Delta", "Edo"] },
];

export function getRegionOfState(state) {
  for (const region of REGIONS) {
    if (region.states.some((s) => s.toLowerCase() === String(state).toLowerCase())) {
      return region.name;
    }
  }
  return "North-Central";
}

export const LEADERS = [
  {
    name: "Alhaji Abdullahi Musa",
    title: "National Chairman",
    region: "North-West",
    state: "Kano State",
    ward: "Municipal Ward",
    image: PARTY_CHAIRMAN_RALLY_IMAGE,
    bio: "A veteran statesman and community mobilizer with over three decades of grassroots organizing across northern Nigeria. Under his stewardship the FMN has grown from a civic coalition into a national movement spanning all 36 states and the FCT.",
  },
  {
    name: "Chief Ngozi Okafor",
    title: "Deputy National Chairman",
    region: "South-East",
    state: "Enugu State",
    ward: "Enugu North",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=640&fit=crop&crop=face",
    bio: "Accomplished business leader and advocate for economic empowerment. She drives industrial policy across the Southeast and chairs the FMN National Economic Advisory Committee.",
  },
  {
    name: "Barr. Ibrahim Sanusi",
    title: "National General Secretary",
    region: "North-Central",
    state: "Kwara State",
    ward: "Ilorin West",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=640&fit=crop&crop=face",
    bio: "Constitutional lawyer and governance reformer championing transparent party administration, electoral integrity, and the nationwide FMN digital membership register.",
  },
  {
    name: "Hajiya Amina Yusuf",
    title: "National Woman Leader",
    region: "North-West",
    state: "Sokoto State",
    ward: "Gawata Ward",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&h=640&fit=crop&crop=face",
    bio: "Women's rights trailblazer leading FMN's gender-inclusive agenda, market women's cooperatives, and grassroots women's empowerment programs nationwide.",
  },
  {
    name: "Comrade Tunde Adebayo",
    title: "National Youth Ambassador",
    region: "South-West",
    state: "Lagos State",
    ward: "Ikeja Ward",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=640&fit=crop&crop=face",
    bio: "Digital activist and entrepreneur connecting Nigeria's 120,000+ youth ambassadors to jobs, innovation hubs, and meaningful political participation.",
  },
  {
    name: "Dr. Blessing Eze",
    title: "National Treasurer",
    region: "South-South",
    state: "Rivers State",
    ward: "Obio-Akpor",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=640&fit=crop&crop=face",
    bio: "Chartered accountant overseeing the transparent management of party finances and the FMN micro-donation programme for small donors.",
  },
  {
    name: "Barr. Fatima Bello",
    title: "National Legal Adviser",
    region: "North-Central",
    state: "FCT Abuja",
    ward: "Central Ward",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=640&fit=crop&crop=face",
    bio: "Senior counsel and electoral law expert ensuring FMN compliance, candidate integrity vetting, and citizens' charter enforcement.",
  },
  {
    name: "Alh. Sani Mohammed",
    title: "National Organising Secretary",
    region: "North-East",
    state: "Borno State",
    ward: "Maiduguri Ward",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=640&fit=crop&crop=face",
    bio: "Rebuilding volunteer networks in conflict-affected zones, mobilizing party structure across all 774 LGAs, and coordinating ward-level organizing.",
  },
  {
    name: "Chief (Mrs.) Dupe Adeyemi",
    title: "National Publicity Secretary",
    region: "South-West",
    state: "Oyo State",
    ward: "Ibadan North",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=640&fit=crop&crop=face",
    bio: "Media strategist and digital communications lead, directing the Movement's newsroom, social campaigns, and public education arm.",
  },
  {
    name: "Mr. Chinedu Okonkwo",
    title: "National Financial Secretary",
    region: "South-East",
    state: "Anambra State",
    ward: "Awka South",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=640&fit=crop&crop=face",
    bio: "Budget and compliance specialist driving accountability across all 36 state chapters and the FMN diaspora fundraising platforms.",
  },
];

export const HOMEPAGE_LEADERS = LEADERS.filter(
  (leader) =>
    ["National Chairman", "National General Secretary", "National Woman Leader", "National Youth Ambassador"].includes(
      leader.title
    )
);