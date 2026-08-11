package content

// SocialLink represents a link to an external social/profile page.
type SocialLink struct {
	Name string `json:"name"`
	URL  string `json:"url"`
	Icon string `json:"icon"`
}

// Profile holds the top-level personal/summary information.
type Profile struct {
	Name          string       `json:"name"`
	Role          string       `json:"role"`
	Location      string       `json:"location"`
	Summary       []string     `json:"summary"`
	ProfileBadge  string       `json:"profileBadge"`
	PhotoURL      string       `json:"photoUrl"`
	ResumeURL     string       `json:"resumeUrl"`
	Social        []SocialLink `json:"social"`
}

// Experience describes one professional role.
type Experience struct {
	Company string   `json:"company"`
	Role    string   `json:"role"`
	Period  string   `json:"period"`
	Bullets []string `json:"bullets"`
	Results string   `json:"results,omitempty"`
}

// Education describes one academic entry.
type Education struct {
	Course      string `json:"course"`
	Institution string `json:"institution"`
	Period      string `json:"period"`
}

// InfraSkill is a highlighted support/infrastructure competency card.
type InfraSkill struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

// SkillCategory groups a set of tool/tech icons under a title.
type SkillCategory struct {
	Title  string   `json:"title"`
	Skills []string `json:"skills"`
}

// Project is a portfolio project card.
type Project struct {
	Title    string   `json:"title"`
	Tech     []string `json:"tech"`
	ImageURL string   `json:"imageUrl"`
	LinkURL  string   `json:"linkUrl"`
}

// Content aggregates the entire portfolio payload served to the frontend.
type Content struct {
	Profile        Profile         `json:"profile"`
	Experience     []Experience    `json:"experience"`
	Education      []Education     `json:"education"`
	InfraSkills    []InfraSkill    `json:"infraSkills"`
	InfraHighlights []string       `json:"infraHighlights"`
	SkillCategories []SkillCategory `json:"skillCategories"`
	Projects       []Project       `json:"projects"`
}
