package content

// Get returns the full portfolio content. It is static in-memory data;
// swap this for a database-backed loader if/when the portfolio needs
// to be edited without a code change.
func Get() Content {
	return Content{
		Profile: Profile{
			Name:     "Michelly Cruz",
			Role:     "Analista de TI",
			Location: "Espírito Santo, Brasil",
			Summary: []string{
				"Analista de TI com experiência em atendimento a usuários via GLPI, resolução de problemas em sistemas e consultas em SQL Server. Atuei em ambientes com grande volume de chamados, realizando mapeamento de processos, documentação técnica e testes de sistemas.",
				"Tenho vivência em metodologias ágeis, gestão de contratos de TI e comunicação com fornecedores. Busco contribuir em equipes de suporte, unindo conhecimento técnico e habilidade de atendimento para garantir soluções ágeis e eficientes.",
			},
			ProfileBadge: "Planejador Analista (PA)",
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
					"Administração e gerenciamento de servidores VPS, incluindo configuração, manutenção, monitoramento e otimização de ambientes Linux.",
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
			},
			{
				Course:      "Pós-graduação em Desenvolvimento Fullstack",
				Institution: "Descomplica - Centro Universitário União das Américas",
				Period:      "Novembro 2024 - Novembro 2025",
			},
			{
				Course:      "Bacharelado em Ciência da Computação",
				Institution: "UNINTER - Centro Universitário Internacional",
				Period:      "Junho 2024 - Trancado em maio de 2025",
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
