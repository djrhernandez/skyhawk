import { gql } from '@apollo/client'

import nycImg from '../styles/images/general/nyc-liberty-logo-1024.png'
import dotaImg from '../styles/images/general/dota2-logo-1024.png'
import sketchpadImg from '../styles/images/general/sketchpad-icon.png'

export const GET_HOTELS = gql`
query fetchAllHotels {
	hotels {
		parid
		bbl  
		bldg_class
		bldg_id_number
		block
		borocode
		borough
		census_tract
		community_board
		council_district
		latitude
		longitude
		lot
		nta_code
		nta_name
		owner_name
		postcode
		street_address
		tax_class
		tax_year
	}
}
`

/* Portfolio */
export const PORTFOLIO = {
	"about": "Born and raised in Bakersfield, my brother and I often enjoyed visiting our father in Los Angeles because our mother liked to dress us up in identical clothes and even the same haircut style." +
		"Graduated with a Bachelors in Economics at Willamette University (Salem, OR) in 2014. Played collegiate football and joined the Sigma Chi Fraternity during my tenure. I also spent a year in Salem to " + 
		"evaluate my career path and enjoy the wonders of the Pacific Northwest. Moved back to Bakersfield, CA in 2015 to earn another bachelors at CSUB in computer science, then to Los Angeles where I worked at " + 
		"Hulu for 3 years as a NOC Incident Manager and Senior Software Engineer. I currently work as a Software Developer for Other World Computing.",
	"contact_info": {
		"name": "David A. Irizarry Hernandez",
		"email": "djrhernandez1@gmail.com",
		"location": "Woodland Hills, CA",
		"phone": "(661) 444-3691",
		"occupation": [
			"Full-Stack Software Engineer",
			"Operational Reliability",
			"Information Security Analyst",
		],
		"social_media": [
			{
				name: "Facebook",
				url: "https://www.facebook.com/profile.php?id=61562874923474"
			},
			{
				name: "GitHub",
				url: "https://wwww.github.com/djrhernandez"
			},
			{
				name: "LeetCode",
				url: "https://leetcode.com/u/djrhernandez1"
			},
			{
				name: "LinkedIn",
				url: "https://www.linkedin.com/in/djrhernandez"
			},
		]
	},
	"skills": {
		"Languages": [
			"Ruby",
			"JavaScript",
			"Python",
			"SQL",
			"Shell/Bash",
			"PHP",
			"C#",
			"C++",
			"Java",
		],
		"Frameworks & APIs": [
		"React", "Next.js", "Ruby on Rails", "GraphQL", "Google", "Slack", "Flask", "Bootstrap", "Xamarin",
		],
		"Operating System Modules": [
			"ZFS", "Zpool", "Systemctl", "NFS", "SMB", "Lsblk", "Ethtool", "Netstat", "Udevadm", "Samba",
		],
		"Cloud & CI/CD Technologies": [
			"AWS", "GCP", "GitHub", "Jenkins", "Spinnaker", "Artifactory", "Terraform",
		],
		"Containerization & Orchestration": [
			"Docker", "Kubernetes", "Amazon ECS",
		],
		"Configuration & Package Management": [
			"Helm", "Puppet", "Node", "NPM", "Yarn", "DNF", "Homebrew", "Gem",
		],
		"Monitoring & Logging": [
			"Grafana", "DataDog", "NewRelic", "CloudWatch", "Big Panda",
		],
		"Database Technologies": [
			"PostGRES", "Redis", "Amazon Aurora", "RDS",
		],
		"Enterprise Integrations": [
			"ServiceNow", "JIRA", "OKTA", "PagerDuty", "Hashicorp Vault", "Solarwinds",
		]
	},
	"projects":  [
		{ name: "Attitunes", description: "", url: "#" },
		{ name: "Mercy Medical Clinic", description: "", url: "#" },
		{ name: "CSUB Website", description: "", url: "#" },
	],
}

export const HOME_PAGE = {
	PAGE_TITLE: (page: any) => `Portfolio | ${page}`,
	NAVIGATION: (id: any) => {
		switch(id) {
			case `about`: return `About`;
			case `menu`: return `Menu`;
			case `projects`: return `Projects`;
			case `resume`: return `Resume`;
			case `skills`: return `Skills`;
			default: return ``;
		}
	},
	SKILLS: (skill: any) => {
		switch(skill) {
			case `api`: return PORTFOLIO.skills["Frameworks & APIs"];
			case `os`: return PORTFOLIO.skills["Operating System Software"];
			case `cloud`: return PORTFOLIO.skills["Cloud & CI/CD Technologies"];
			case `container`: return PORTFOLIO.skills["Containerization & Orchestration"];
			case `config`: return PORTFOLIO.skills["Configuration & Package Management"];
			case `monitor`: return PORTFOLIO.skills["Monitoring & Logging"];
			case `db`: return PORTFOLIO.skills["Database Technologies"];
			case `enterprise`: return PORTFOLIO.skills["Enterprise Integrations"];
			default: return PORTFOLIO.skills;
		}
	},

	MONTHS_ABBREVIATED: (index: string | number) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index],
	DAYS_ABBREVIATED: (index: string | number) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]
}

export const ENDPOINTS = [
	{
		name: "Dota 2 Analytics (WIP)",
		url: "/dota2",
		image: dotaImg,
		description: `Dive into the world of Dota 2 analytics to elevate your gameplay ` +
		`with comprehensive insight. Unlock the secrets to mastering strategies, ` +
		`optimizing performance, and achieving victory in every match.`
	},
	{
		name: "New York - OpenData",
		url: "/nycod",
		image: nycImg,
		description: `Explore fascinating insights from freely available public data on ` +
		`hotels and properties across the five boroughs within New York City.`
	},
	{
		name: "Sketchpad (WIP)",
		url: "/sketchpad",
		image: sketchpadImg,
		description: `Experience an interactive whiteboard, where collaboration and ` +
		`creativity come alive with just a click. Dive into a seamless world of digital ` +
		`collaboration, right from your browser.`
	},
	{
		name: "Portfolio",
		url: "/portfolio",
		image: "",
		description: `Get to know the developer behind the website. Learn more about where ` + 
		`the developer came from, and what they have learned over the years with a single ` + 
		`click. It might surprise you.`
	},
]