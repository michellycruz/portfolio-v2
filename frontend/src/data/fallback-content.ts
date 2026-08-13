import type { Content } from "../types/content";

// Mirrors backend/internal/content/data.go. Used only if the Go API is
// unreachable, so the site never renders blank in front of a recruiter.
export const fallbackContent: Content = {
  profile: {
    name: "Michelly Cruz",
    role: "Analista de Sistemas",
    location: "Espírito Santo, Brasil",
    summary: [
      "Analista de Sistemas na Hostbraza, onde transito entre desenvolvimento, infraestrutura e atendimento: crio plugins e aplicações para WordPress em PHP, desenvolvo aplicações e automações em PHP, Go e React com apoio de IA, administro servidores VPS em ambiente Linux e atendo clientes de hospedagem.",
      "Venho do suporte técnico e da análise de sistemas, com vivência em atendimento via GLPI, consultas SQL, levantamento de requisitos, documentação técnica e protótipos em Figma e Balsamiq. Dessa origem trago o hábito de documentar, testar e traduzir necessidade de negócio em solução técnica.",
    ],
    profileBadge: "Planejador Analista (PA)",
    behavior: [
      { label: "Executor", percent: 13 },
      { label: "Comunicador", percent: 22 },
      { label: "Planejador", percent: 33 },
      { label: "Analista", percent: 33 },
    ],
    photoUrl: "/images/foto-pessoal.png",
    resumeUrl: "/resume/curriculo_michelly.pdf",
    social: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/michxcrz/", icon: "linkedin" },
      { name: "Instagram", url: "https://www.instagram.com/michxcrz00/", icon: "instagram" },
      { name: "GitHub", url: "https://github.com/michellycruz", icon: "github" },
      { name: "WhatsApp", url: "https://wa.me/5527996942003", icon: "whatsapp" },
    ],
  },
  experience: [
    {
      company: "Hostbraza LTDA",
      role: "Analista de Sistemas",
      period: "Abril 2026 - Atual",
      bullets: [
        "Desenvolvimento de plugins e aplicações para WordPress utilizando PHP, com apoio de IA para acelerar implementação, refatoração e testes.",
        "Criação de aplicações e automações em PHP, Go e React, utilizando o Claude Code como assistente de desenvolvimento.",
        "Administração e gerenciamento de servidores VPS, incluindo configuração, manutenção, monitoramento e otimização de ambientes Linux.",
        "Atendimento N1 aos clientes de hospedagem.",
        "Desenvolvimento orientado por IA (AI-Assisted Development), utilizando engenharia de prompts para geração de código, documentação e otimização de processos.",
        "Correção de bugs, implementação de novas funcionalidades e manutenção de aplicações web.",
      ],
      results:
        "Aumento da produtividade no desenvolvimento através do uso estratégico de IA, redução do tempo de entrega de funcionalidades, resolução ágil de chamados técnicos e melhoria da experiência dos clientes de hospedagem.",
    },
    {
      company: "Secretaria de Estado da Educação - SEDU",
      role: "Analista de Sistemas",
      period: "Outubro 2023 - Setembro 2024",
      bullets: [
        "Atendimento e resolução de chamados técnicos (GLPI) relacionados aos sistemas educacionais.",
        "Consultas SQL no banco de dados para extração e análise de informações.",
        "Criação de protótipos de interface em Figma e Balsamiq para apoio no design e no levantamento de requisitos.",
        "Colaboração em reuniões de análise e levantamento de requisitos de sistemas para identificar necessidades de negócios.",
        "Atendimento e suporte ao usuário final.",
      ],
      results:
        "Redução de retrabalho em homologações ao estruturar melhor os testes; maior clareza em fluxos de processos com documentação aplicada.",
    },
    {
      company: "Multivix",
      role: "Secretária",
      period: "Abril 2021 - Outubro 2023",
      bullets: [
        "Suporte direto aos alunos (presencial ou remoto).",
        "Controle e organização de processos administrativos.",
        "Gestão de provas presenciais e apoio acadêmico.",
      ],
      results:
        "Melhoria no fluxo de atendimento aos alunos, com otimização no tempo de resposta às demandas acadêmicas.",
    },
  ],
  education: [
    {
      course: "CST em Análise e Desenvolvimento de Sistemas",
      institution: "Multivix - Empresa Brasileira de Ensino Pesquisa e Extensão",
      period: "Julho 2021 - Julho 2023",
    },
    {
      course: "Pós-graduação em Engenharia de Software",
      institution: "Descomplica - Centro Universitário União das Américas",
      period: "Agosto 2023 - Agosto 2024",
    },
    {
      course: "Pós-graduação em Desenvolvimento Fullstack",
      institution: "Descomplica - Centro Universitário União das Américas",
      period: "Novembro 2024 - Novembro 2025",
    },
    {
      course: "Bacharelado em Ciência da Computação",
      institution: "UNINTER - Centro Universitário Internacional",
      period: "Junho 2024 - Trancado em maio de 2025",
    },
  ],
  institutions: [
    {
      name: "DIO - Digital Innovation One",
      tracks: [
        {
          name: "Formação IA Generativa",
          status: "Em andamento",
          courses: [
            { title: "Introdução aos Fundamentos de IA Generativa com a Universia", date: "Outubro 2025", hours: "1h", area: "IA e Automação" },
            { title: "Aplicações e Impacto da IA no Mundo Atual", date: "Maio 2026", hours: "1h", area: "IA e Automação" },
            { title: "Aplicações Práticas da Inteligência Artificial", date: "Maio 2026", hours: "2h", area: "IA e Automação" },
            { title: "A Era da IA: Machine Learning, LLMs, IA Generativa e Agentes", date: "Maio 2026", hours: "2h", area: "IA e Automação" },
            { title: "Introdução à Engenharia de Prompts", date: "Junho 2026", hours: "1h", area: "IA e Automação" },
          ],
        },
        {
          name: "Formação React",
          status: "Em andamento",
          courses: [
            { title: "Configuração de Ambiente React", date: "Maio 2024", hours: "1h", area: "Front-end" },
            { title: "Páginas Web com HTML", date: "Maio 2024", hours: "2h", area: "Front-end" },
            { title: "Estilizando Páginas com CSS", date: "Maio 2024", hours: "1h", area: "Front-end" },
            { title: "Tornando Páginas Web Interativas com JavaScript", date: "Maio 2024", hours: "2h", area: "Front-end" },
            { title: "Entendendo a DOM (Document Object Model)", date: "Maio 2024", hours: "1h", area: "Front-end" },
            { title: "Primeiros Passos na Biblioteca React", date: "Maio 2024", hours: "1h", area: "Front-end" },
            { title: "Criando Uma Calculadora Com React", date: "Maio 2024", hours: "1h", area: "Front-end" },
            { title: "Criando um Projeto React do Zero", date: "Junho 2024", hours: "1h", area: "Front-end" },
            { title: "Convenções e Qualidade de Código React", date: "Junho 2024", hours: "1h", area: "Front-end" },
          ],
        },
        {
          name: "Formação DevOps",
          status: "Em andamento",
          courses: [
            { title: "Onboarding - DevOps", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Entendendo O que é DevOps", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "DevOps e Processos de Desenvolvimento de Software", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Introdução ao DevSecOps", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Qual é a diferença entre SRE e DevOps", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Introdução ao DevOps com CI/CD", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Criando seu Primeiro Projeto de DevOps com GitLab", date: "Junho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Cloud Computing e o DevOps", date: "Julho 2025", hours: "1h", area: "Infra e DevOps" },
            { title: "Infraestrutura como Código no DevOps", date: "Julho 2025", hours: "1h", area: "Infra e DevOps" },
          ],
        },
        {
          name: "DIO Campus Expert (13ª turma)",
          status: "Concluída",
          courses: [
            { title: "Onboarding | Boas-vindas ao DIO Campus Expert Turma 13", date: "Agosto 2025", hours: "1h", area: "Processos e Design" },
            {
              title: "Como desenvolver a sua Liderança e Protagonismo como embaixador(a) da DIO!",
              date: "Agosto 2025",
              hours: "2h",
              area: "Processos e Design",
            },
            { title: "Programa DIO Campus Expert", date: "Agosto - Setembro 2025", hours: "30h", area: "Processos e Design" },
          ],
        },
      ],
    },
    {
      name: "Conquer Business School",
      courses: [
        {
          title: "Inteligência Artificial: eleve sua produtividade e acelere sua carreira",
          date: "Junho 2024",
          hours: "10h",
          area: "IA e Automação",
        },
      ],
    },
    {
      name: "Curso em Vídeo",
      courses: [
        { title: "MySQL", date: "Fevereiro 2023", hours: "40h", area: "Dados e Fundamentos" },
        { title: "Curso HTML5 e CSS3: Módulo 1 de 5", date: "Março 2023", hours: "40h", area: "Front-end" },
        { title: "Curso HTML5 e CSS3: Módulo 2 de 5", date: "Abril 2023", hours: "40h", area: "Front-end" },
        { title: "Curso HTML5 e CSS3: Módulo 3 de 5", date: "Abril 2023", hours: "40h", area: "Front-end" },
        { title: "Curso HTML5 e CSS3: Módulo 4 de 5", date: "Maio 2023", hours: "40h", area: "Front-end" },
        { title: "JavaScript", date: "Junho 2023", hours: "40h", area: "Front-end" },
        { title: "Segurança da Informação: Módulo 00", date: "Setembro 2023", hours: "20h", area: "Infra e DevOps" },
        { title: "Algoritmo", date: "Setembro 2025", hours: "40h", area: "Dados e Fundamentos" },
      ],
    },
    {
      name: "OneBitCode",
      courses: [
        { title: "Análise de Requisitos", date: "Abril 2024", area: "Processos e Design" },
        { title: "Metodologias Ágeis - SCRUM", date: "Abril 2024", area: "Processos e Design" },
        { title: "Web Scraping", date: "Abril 2024", area: "Dados e Fundamentos" },
        { title: "UI/UX Design", date: "Maio 2024", area: "Processos e Design" },
        { title: "Sass", date: "Maio 2024", hours: "2h", area: "Front-end" },
        { title: "Tailwind CSS", date: "Maio 2024", area: "Front-end" },
        { title: "Bootstrap", date: "Maio 2024", hours: "7h", area: "Front-end" },
        { title: "JavaScript I, II, III, IV, V e VI", date: "Outubro 2024", hours: "40h", area: "Front-end" },
        { title: "TypeScript", date: "Outubro 2024", hours: "5h", area: "Front-end" },
      ],
    },
    {
      name: "Cubos Academy",
      courses: [{ title: "Minicurso de UX/UI Design", date: "Junho 2024", hours: "5h", area: "Processos e Design" }],
    },
  ],
  infraSkills: [
    { title: "Suporte a Usuários", description: "Atendimento via GLPI, resolução de chamados, instalação e configuração de softwares e aplicativos." },
    { title: "Manutenção e Hardware", description: "Correções preventivas e corretivas, atualização de antivírus, configuração de impressoras." },
    { title: "Infraestrutura em Nuvem", description: "Gerenciamento de serviços em nuvem AWS e Azure, configuração e manutenção de servidores virtuais, implementação de soluções de backup e recuperação em nuvem." },
  ],
  infraHighlights: [
    "Atendimento primário a usuários internos e externos.",
    "Manutenção de hardware e software (instalação, configuração e suporte).",
    "Programação e configuração de impressoras.",
    "Atualização de antivírus e segurança básica.",
    "Monitoramento de conexões de rede.",
    "Acompanhamento completo de chamados, do registro à solução.",
    "Administração e suporte em ambientes de nuvem (AWS e Azure).",
    "Criação e gerenciamento de recursos de infraestrutura em cloud.",
  ],
  skillCategories: [
    { title: "Prototipação", skills: ["figma", "balsamiq"] },
    { title: "Ferramentas", skills: ["sql", "gitlab", "git", "github-icon", "excel", "teams", "word", "outlook", "notion"] },
    { title: "Linguagens e Frameworks", skills: ["html", "css", "js", "bootstrap", "sass", "react", "tailwind"] },
    { title: "Inteligência Artificial", skills: ["ia"] },
  ],
  projects: [
    { title: "Página de Emails", tech: ["react", "tailwind"], imageUrl: "/images/projects/pagina_de_emails.png", linkUrl: "https://paginadeemail.vercel.app/" },
    { title: "Jogo da Memória", tech: ["html", "css", "js"], imageUrl: "/images/projects/jogo_da_memoria.png", linkUrl: "https://michellycruz.github.io/jogos-e-projetos/jogo_da_memoria/pages/game.html" },
    { title: "Electrum", tech: ["html", "sass"], imageUrl: "/images/projects/electrum.png", linkUrl: "https://electrum-sass.vercel.app/" },
    { title: "Calculadora", tech: ["html", "css", "js"], imageUrl: "/images/projects/calculadora.png", linkUrl: "https://michellycruz.github.io/javascript-onebitcode/projetos/calculadora/index.html" },
    { title: "PetLife", tech: ["html", "css", "js"], imageUrl: "/images/projects/petlife.png", linkUrl: "https://michellycruz.github.io/jogos-e-projetos/petlife/index.html" },
    { title: "Código Certo", tech: ["html", "css", "bootstrap"], imageUrl: "/images/projects/codigo_certo.png", linkUrl: "https://trilha-front-end-jr-michelly-cruz.vercel.app/" },
    { title: "Agency", tech: ["html", "sass"], imageUrl: "/images/projects/agency.png", linkUrl: "https://projetos-sass-agency.vercel.app/" },
    { title: "Gorjetas", tech: ["html", "css", "js"], imageUrl: "/images/projects/calculadora_de_gorjetas.png", linkUrl: "https://michellycruz.github.io/projetos_javascript/9_calculadora_de_gorjetas//" },
  ],
};
