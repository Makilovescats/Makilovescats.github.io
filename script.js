document.addEventListener('DOMContentLoaded', function() {
    // Data for games section
    const games = [
        {
            title: "Roblox",
            description: "Private Executor I made for roblox, and no it will not be released to the public as it's not fully stable and not that good. The image above is not mine",
            image: "https://preview.redd.it/i-made-a-little-concept-of-my-own-executor-lol-v0-rxo5u2frj9xc1.png?auto=webp&s=4b1b59b0e8c97679dc9aca1d6aeeed1cf96df223"
        },
        {
            title: "Rust",
            description: "A cheat i made for Rust, it was a fun project but i dont play rust anymore so i dont update it anymore, and yes the cheat was not released to the public. The image used in this is a very similar gui i made to it.",
            image: "https://s3-alpha.figma.com/hub/file/5632435771/ba3a93db-d319-45e4-8e3e-c1784a9a4261-cover.png"
        }
    ];

    // Data for programming languages
    const skills = [
        { name: "C++", level: "Advanced" },
        { name: "C#", level: "Advanced" },
        { name: "C", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
        { name: "HTML/CSS", level: "Advanced" },
        { name: "Rust", level: "Advanced" },
        { name: "React", level: "Intermediate" },
        { name: "Node.js", level: "Advanced" },
        { name: "Java", level: "Intermediate" },
        { name: "Bash", level: "Intermediate" },
        { name: "Git", level: "Advanced" },
        { name: "Electron", level: "Advanced" }
    ];

    // Data for projects
    const projects = [
        {
            title: "Private Message Sender",
            description: "A simple website i made that will send a message to me via discord webhook, please dont spam it <3",
            link: "./message-sender/index.html"  // Link to the subdirectory
        }
    ];

    // Populate games section
    const gamesContainer = document.querySelector('.card-container');
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'card';
        gameCard.innerHTML = `
            <div class="card-img" style="background-image: url('${game.image}')"></div>
            <div class="card-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    });

    // Example of custom icons for skills (partial code)
    const getIconForSkill = (skillName) => {
        const icons = {
            "C++": "fa-solid fa-code",
            "C#": "fa-solid fa-sharp",
            "C": "fa-solid fa-c",
            "Python": "fa-brands fa-python",
            "JavaScript": "fa-brands fa-js",
            "TypeScript": "fa-brands fa-js",
            "HTML/CSS": "fa-brands fa-html5",
            "Rust": "fa-solid fa-gear",
            "React": "fa-brands fa-react",
            "Node.js": "fa-brands fa-node-js",
            "Java": "fa-brands fa-java",
            "Bash": "fa-solid fa-terminal",
            "Git": "fa-brands fa-git-alt",
            "Electron": "fa-solid fa-atom"
        };
        return icons[skillName] || "fa-solid fa-code";
    };

    // Populate skills section
    const skillsContainer = document.querySelector('.skills-container');
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-icon">
                <i class="${getIconForSkill(skill.name)}"></i>
            </div>
            <h3>${skill.name}</h3>
            <p>Level: ${skill.level}</p>
        `;
        skillsContainer.appendChild(skillItem);
    });

    // Populate projects section
    const projectsContainer = document.querySelector('.projects-container');
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectsContainer.appendChild(projectItem);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});