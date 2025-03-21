document.addEventListener("DOMContentLoaded", () => {
  var form = document.getElementById("messageForm");
  var nameInput = document.getElementById("name");
  var messageInput = document.getElementById("message");
  var fileInput = document.getElementById("file");
  var discordPreview = document.getElementById("discordPreview");
  var discordUsername = discordPreview.querySelector(".discord-username");
  var discordMessage = discordPreview.querySelector(".discord-message");
  var imagePreview = document.getElementById("imagePreview");

  var canvas = document.getElementById("backgroundCanvas");
  var ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  
  var particles = [];
  var particleCount = 100;
  var maxDistance = 150;
  
  for (let i = 0; i < particleCount; i++) {
    var purpleHue = Math.random() * 60 + 240;
    var saturation = Math.random() * 30 + 70;
    var lightness = Math.random() * 30 + 60;
    var alpha = Math.random() * 0.5 + 0.5;
    
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: `hsla(${purpleHue}, ${saturation}%, ${lightness}%, ${alpha})`
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var j = 0; j < particles.length; j++) {
      var particle = particles[j];
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(170, 120, 255, 0.8)";
      
      for(var k = 0; k < particles.length; k++) {
        var otherParticle = particles[k];
        var dx = particle.x - otherParticle.x;
        var dy = particle.y - otherParticle.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(170, 120, 255, ${1 - distance / maxDistance})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();

  nameInput.addEventListener("input", () => {
    discordUsername.textContent = nameInput.value || "Anonymous";
  });

  messageInput.addEventListener("input", function() {
    discordMessage.textContent = messageInput.value || "Your message will appear here...";
  });

  fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.style.display = "none";
      imagePreview.src = "";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    var name = nameInput.value;
    var message = messageInput.value;
    var file = fileInput.files[0];

    if (!message) {
      alert("Message is required!");
      return;
    }

    var formData = new FormData();
    formData.append("content", `**Name:** ${name || "Anonymous"}\n**Message:** ${message}`);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(atob("aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM1MTY0MDk5Njc2ODkwNzMyNS9vNlVsdk5xY3FBYU1RTkpIZEN2ZU5nenhrcVpZaUlMWHdHN0VJcm45WlJDTHJ4Rl95MXBsU3ptV3ZGYzBwVGxmUl9RNA=="), {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
        discordUsername.textContent = "Anonymous";
        discordMessage.textContent = "Your message will appear here...";
        imagePreview.style.display = "none";
        imagePreview.src = "";
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
});