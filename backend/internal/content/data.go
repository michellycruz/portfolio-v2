package content

// Get returns the full portfolio content. It is static in-memory data;
// swap this for a database-backed loader if/when the portfolio needs
// to be edited without a code change.
func Get() Content {
	return Content{
		Profile: Profile{
			Name:     "Michelly Cruz",
			Role:     "Analista de Sistemas",
			Location: "Espírito Santo, Brasil",
			Summary: []string{
				"Analista de Sistemas na Hostbraza, onde transito entre desenvolvimento e atendimento: crio plugins e aplicações para WordPress em PHP, desenvolvo aplicações e automações em PHP, Go e React com apoio de IA e atendo clientes de hospedagem.",
				"Venho do suporte técnico e da análise de sistemas, com vivência em atendimento via GLPI, consultas SQL, levantamento de requisitos, documentação técnica e protótipos em Figma e Balsamiq. Dessa origem trago o hábito de documentar, testar e traduzir necessidade de negócio em solução técnica.",
			},
			ProfileBadge: "Planejador Analista (PA)",
			Behavior: []BehaviorTrait{
				{Label: "Executor", Percent: 13},
				{Label: "Comunicador", Percent: 22},
				{Label: "Planejador", Percent: 33},
				{Label: "Analista", Percent: 33},
			},
			PhotoURL:     "/images/foto-pessoal.png",
			ResumeURL:    "/resume/curriculo_michelly.pdf",
			Social: []SocialLink{
				{Name: "LinkedIn", URL: "https://www.linkedin.com/in/michxcrz/", Icon: "linkedin"},
				{Name: "Instagram", URL: "https://www.instagram.com/michxcrz00/", Icon: "instagram"},
				{Name: "GitHub", URL: "https://github.com/michellycruz", Icon: "github"},
				{Name: "WhatsApp", URL: "https://wa.me/5527996942003", Icon: "whatsapp"},
			},
		},
		Experience: []Experience{
			{
				Company: "Hostbraza LTDA",
				Role:    "Analista de Sistemas",
				Period:  "Abril 2026 - Atual",
				Bullets: []string{
					"Desenvolvimento de plugins e aplicações para WordPress utilizando PHP, com apoio de IA para acelerar implementação, refatoração e testes.",
					"Criação de aplicações e automações em PHP, Go e React, utilizando o Claude Code como assistente de desenvolvimento.",
					"Atendimento N1 aos clientes de hospedagem.",
					"Desenvolvimento orientado por IA (AI-Assisted Development), utilizando engenharia de prompts para geração de código, documentação e otimização de processos.",
					"Correção de bugs, implementação de novas funcionalidades e manutenção de aplicações web.",
				},
				Results: "Aumento da produtividade no desenvolvimento através do uso estratégico de IA, redução do tempo de entrega de funcionalidades, resolução ágil de chamados técnicos e melhoria da experiência dos clientes de hospedagem.",
			},
			{
				Company: "Secretaria de Estado da Educação - SEDU",
				Role:    "Analista de Sistemas",
				Period:  "Outubro 2023 - Setembro 2024",
				Bullets: []string{
					"Atendimento e resolução de chamados técnicos (GLPI) relacionados aos sistemas educacionais.",
					"Consultas SQL no banco de dados para extração e análise de informações.",
					"Criação de protótipos de interface em Figma e Balsamiq para apoio no design e no levantamento de requisitos.",
					"Colaboração em reuniões de análise e levantamento de requisitos de sistemas para identificar necessidades de negócios.",
					"Atendimento e suporte ao usuário final.",
				},
				Results: "Redução de retrabalho em homologações ao estruturar melhor os testes; maior clareza em fluxos de processos com documentação aplicada.",
			},
			{
				Company: "Multivix",
				Role:    "Secretária",
				Period:  "Abril 2021 - Outubro 2023",
				Bullets: []string{
					"Suporte direto aos alunos (presencial ou remoto).",
					"Controle e organização de processos administrativos.",
					"Gestão de provas presenciais e apoio acadêmico.",
				},
				Results: "Melhoria no fluxo de atendimento aos alunos, com otimização no tempo de resposta às demandas acadêmicas.",
			},
		},
		Education: []Education{
			{
				Course:      "CST em Análise e Desenvolvimento de Sistemas",
				Institution: "Multivix - Empresa Brasileira de Ensino, Pesquisa e Extensão",
				Period:      "Julho 2021 - Julho 2023",
			},
			{
				Course:      "Pós-graduação em Engenharia de Software",
				Institution: "Descomplica - Centro Universitário União das Américas",
				Period:      "Agosto 2023 - Agosto 2024",
				Hours:       "540h",
			},
			{
				Course:      "Bacharelado em Ciência da Computação",
				Institution: "UNINTER - Centro Universitário Internacional",
				Period:      "Junho 2024 - Trancado em maio de 2025",
			},
		},
		Institutions: []Institution{
			{
				Name: "Descomplica - UniAmérica",
				Tracks: []Track{
					{
						// Disciplinas e cargas horárias conforme o histórico escolar do
						// certificado de conclusão, que soma exatamente as 540h do curso.
						Name:   "Pós-graduação em Engenharia de Software",
						Status: "Concluída",
						Courses: []Course{
							{Title: "Programação Extrema", Date: "Janeiro 2024", Hours: "60h", Area: "Processos e Design"},
							{Title: "Essencial DataBase", Date: "Fevereiro 2024", Hours: "30h", Area: "Dados e Fundamentos"},
							{Title: "Lógica de Programação com Java", Date: "Fevereiro 2024", Hours: "30h", Area: "Dados e Fundamentos"},
							{Title: "Interface de Software", Date: "Fevereiro 2024", Hours: "60h", Area: "Processos e Design"},
							{Title: "Gerenciamento Avançado de Projetos", Date: "Fevereiro 2024", Hours: "60h", Area: "Processos e Design"},
							{Title: "Metodologias de Desenvolvimento de Software", Date: "Fevereiro 2024", Hours: "30h", Area: "Processos e Design"},
							{Title: "Estrutura de Dados para Sistemas Inteligentes", Date: "Março 2024", Hours: "60h", Area: "Dados e Fundamentos"},
							{Title: "Arquitetura de BI e Big Data", Date: "Abril 2024", Hours: "60h", Area: "Dados e Fundamentos"},
							{Title: "Plataformas para Desenvolvimento na Nuvem", Date: "Maio 2024", Hours: "60h", Area: "Infra e DevOps"},
							{Title: "Arquitetura e Modelagem de Dados", Date: "Junho 2024", Hours: "30h", Area: "Dados e Fundamentos"},
							{Title: "Análise de Dados e BI para Tomada de Decisão", Date: "Julho 2024", Hours: "30h", Area: "Dados e Fundamentos"},
							{Title: "Cloud Diversity AWS", Hours: "30h", Area: "Infra e DevOps"},
						},
					},
				},
			},
			{
				Name: "DIO - Digital Innovation One",
				Tracks: []Track{
					{
						Name:   "Formação IA Generativa",
						Status: "Em andamento",
						Courses: []Course{
							{Title: "Introdução aos Fundamentos de IA Generativa com a Universia", Date: "Outubro 2025", Hours: "1h", Area: "IA e Automação"},
							{Title: "Aplicações e Impacto da IA no Mundo Atual", Date: "Maio 2026", Hours: "1h", Area: "IA e Automação"},
							{Title: "Aplicações Práticas da Inteligência Artificial", Date: "Maio 2026", Hours: "2h", Area: "IA e Automação"},
							{Title: "A Era da IA: Machine Learning, LLMs, IA Generativa e Agentes", Date: "Maio 2026", Hours: "2h", Area: "IA e Automação"},
							{Title: "Introdução à Engenharia de Prompts", Date: "Junho 2026", Hours: "1h", Area: "IA e Automação"},
						},
					},
					{
						Name:   "Formação React",
						Status: "Em andamento",
						Courses: []Course{
							{Title: "Configuração de Ambiente React", Date: "Maio 2024", Hours: "1h", Area: "Front-end"},
							{Title: "Páginas Web com HTML", Date: "Maio 2024", Hours: "2h", Area: "Front-end"},
							{Title: "Estilizando Páginas com CSS", Date: "Maio 2024", Hours: "1h", Area: "Front-end"},
							{Title: "Tornando Páginas Web Interativas com JavaScript", Date: "Maio 2024", Hours: "2h", Area: "Front-end"},
							{Title: "Entendendo a DOM (Document Object Model)", Date: "Maio 2024", Hours: "1h", Area: "Front-end"},
							{Title: "Primeiros Passos na Biblioteca React", Date: "Maio 2024", Hours: "1h", Area: "Front-end"},
							{Title: "Criando Uma Calculadora Com React", Date: "Maio 2024", Hours: "1h", Area: "Front-end"},
							{Title: "Criando um Projeto React do Zero", Date: "Junho 2024", Hours: "1h", Area: "Front-end"},
							{Title: "Convenções e Qualidade de Código React", Date: "Junho 2024", Hours: "1h", Area: "Front-end"},
						},
					},
					{
						Name:   "Formação DevOps",
						Status: "Em andamento",
						Courses: []Course{
							{Title: "Onboarding - DevOps", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Entendendo O que é DevOps", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "DevOps e Processos de Desenvolvimento de Software", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Introdução ao DevSecOps", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Qual é a diferença entre SRE e DevOps", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Introdução ao DevOps com CI/CD", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Criando seu Primeiro Projeto de DevOps com GitLab", Date: "Junho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Cloud Computing e o DevOps", Date: "Julho 2025", Hours: "1h", Area: "Infra e DevOps"},
							{Title: "Infraestrutura como Código no DevOps", Date: "Julho 2025", Hours: "1h", Area: "Infra e DevOps"},
						},
					},
					{
						Name:   "DIO Campus Expert (13ª turma)",
						Status: "Concluída",
						Courses: []Course{
							{Title: "Onboarding | Boas-vindas ao DIO Campus Expert Turma 13", Date: "Agosto 2025", Hours: "1h", Area: "Processos e Design"},
							{Title: "Como desenvolver a sua Liderança e Protagonismo como embaixador(a) da DIO!", Date: "Agosto 2025", Hours: "2h", Area: "Processos e Design"},
							{Title: "Programa DIO Campus Expert", Date: "Agosto - Setembro 2025", Hours: "30h", Area: "Processos e Design"},
						},
					},
				},
			},
			{
				Name: "Conquer Business School",
				Courses: []Course{
					{Title: "Inteligência Artificial: eleve sua produtividade e acelere sua carreira", Date: "Junho 2024", Hours: "10h", Area: "IA e Automação"},
				},
			},
			{
				Name: "Curso em Vídeo",
				Courses: []Course{
					{Title: "MySQL", Date: "Fevereiro 2023", Hours: "40h", Area: "Dados e Fundamentos"},
					{Title: "Curso HTML5 e CSS3: Módulo 1 de 5", Date: "Março 2023", Hours: "40h", Area: "Front-end"},
					{Title: "Curso HTML5 e CSS3: Módulo 2 de 5", Date: "Abril 2023", Hours: "40h", Area: "Front-end"},
					{Title: "Curso HTML5 e CSS3: Módulo 3 de 5", Date: "Abril 2023", Hours: "40h", Area: "Front-end"},
					{Title: "Curso HTML5 e CSS3: Módulo 4 de 5", Date: "Maio 2023", Hours: "40h", Area: "Front-end"},
					{Title: "JavaScript", Date: "Junho 2023", Hours: "40h", Area: "Front-end"},
					{Title: "Segurança da Informação: Módulo 00", Date: "Setembro 2023", Hours: "20h", Area: "Infra e DevOps"},
					{Title: "Algoritmo", Date: "Setembro 2025", Hours: "40h", Area: "Dados e Fundamentos"},
				},
			},
			{
				Name: "OneBitCode",
				Courses: []Course{
					{Title: "Análise de Requisitos", Date: "Abril 2024", Area: "Processos e Design"},
					{Title: "Metodologias Ágeis - SCRUM", Date: "Abril 2024", Area: "Processos e Design"},
					{Title: "Web Scraping", Date: "Abril 2024", Area: "Dados e Fundamentos"},
					{Title: "UI/UX Design", Date: "Maio 2024", Area: "Processos e Design"},
					{Title: "Sass", Date: "Maio 2024", Hours: "2h", Area: "Front-end"},
					{Title: "Tailwind CSS", Date: "Maio 2024", Area: "Front-end"},
					{Title: "Bootstrap", Date: "Maio 2024", Hours: "7h", Area: "Front-end"},
					{Title: "JavaScript I, II, III, IV, V e VI", Date: "Outubro 2024", Hours: "40h", Area: "Front-end"},
					{Title: "TypeScript", Date: "Outubro 2024", Hours: "5h", Area: "Front-end"},
				},
			},
			{
				Name: "Cubos Academy",
				Courses: []Course{
					{Title: "Minicurso de UX/UI Design", Date: "Junho 2024", Hours: "5h", Area: "Processos e Design"},
				},
			},
		},
		InfraSkills: []InfraSkill{
			{Title: "Suporte a Usuários", Description: "Atendimento via GLPI, resolução de chamados, instalação e configuração de softwares e aplicativos."},
			{Title: "Manutenção e Hardware", Description: "Correções preventivas e corretivas, atualização de antivírus, configuração de impressoras."},
			{Title: "Infraestrutura em Nuvem", Description: "Gerenciamento de serviços em nuvem AWS e Azure, configuração e manutenção de servidores virtuais, implementação de soluções de backup e recuperação em nuvem."},
		},
		InfraHighlights: []string{
			"Atendimento primário a usuários internos e externos.",
			"Manutenção de hardware e software (instalação, configuração e suporte).",
			"Programação e configuração de impressoras.",
			"Atualização de antivírus e segurança básica.",
			"Monitoramento de conexões de rede.",
			"Acompanhamento completo de chamados, do registro à solução.",
			"Administração e suporte em ambientes de nuvem (AWS e Azure).",
			"Criação e gerenciamento de recursos de infraestrutura em cloud.",
		},
		SkillCategories: []SkillCategory{
			{Title: "Prototipação", Skills: []string{"figma", "balsamiq"}},
			{Title: "Ferramentas", Skills: []string{"sql", "gitlab", "git", "github-icon", "excel", "teams", "word", "outlook", "notion"}},
			{Title: "Linguagens e Frameworks", Skills: []string{"html", "css", "js", "bootstrap", "sass", "react", "tailwind"}},
			{Title: "Inteligência Artificial", Skills: []string{"ia"}},
		},
		Projects: []Project{
			{
				Title:    "Página de Emails",
				Tech:     []string{"react", "tailwind"},
				ImageURL: "/images/projects/pagina_de_emails.png",
				LinkURL:  "https://paginadeemail.vercel.app/",
			},
			{
				Title:    "Jogo da Memória",
				Tech:     []string{"html", "css", "js"},
				ImageURL: "/images/projects/jogo_da_memoria.png",
				LinkURL:  "https://michellycruz.github.io/jogos-e-projetos/jogo_da_memoria/pages/game.html",
			},
			{
				Title:    "Electrum",
				Tech:     []string{"html", "sass"},
				ImageURL: "/images/projects/electrum.png",
				LinkURL:  "https://electrum-sass.vercel.app/",
			},
			{
				Title:    "Calculadora",
				Tech:     []string{"html", "css", "js"},
				ImageURL: "/images/projects/calculadora.png",
				LinkURL:  "https://michellycruz.github.io/javascript-onebitcode/projetos/calculadora/index.html",
			},
			{
				Title:    "PetLife",
				Tech:     []string{"html", "css", "js"},
				ImageURL: "/images/projects/petlife.png",
				LinkURL:  "https://michellycruz.github.io/jogos-e-projetos/petlife/index.html",
			},
			{
				Title:    "Código Certo",
				Tech:     []string{"html", "css", "bootstrap"},
				ImageURL: "/images/projects/codigo_certo.png",
				LinkURL:  "https://trilha-front-end-jr-michelly-cruz.vercel.app/",
			},
			{
				Title:    "Agency",
				Tech:     []string{"html", "sass"},
				ImageURL: "/images/projects/agency.png",
				LinkURL:  "https://projetos-sass-agency.vercel.app/",
			},
			{
				Title:    "Gorjetas",
				Tech:     []string{"html", "css", "js"},
				ImageURL: "/images/projects/calculadora_de_gorjetas.png",
				LinkURL:  "https://michellycruz.github.io/projetos_javascript/9_calculadora_de_gorjetas//",
			},
		},
	}
}
