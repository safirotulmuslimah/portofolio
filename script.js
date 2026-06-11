const darkBtn = document.getElementById("darkMode");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    if (darkBtn) {
        darkBtn.innerHTML = "☀️";
    }
}

darkBtn?.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkBtn.innerHTML = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        darkBtn.innerHTML = "🌙";
    }

});

const container = document.getElementById("projectContainer");

if (container) {

    fetch("project.json")

        .then(response => response.json())

        .then(data => {

            console.log("Data JSON:", data);

            displayProjects(data);

            const search =
                document.getElementById("search");

            search?.addEventListener("input", e => {

                const keyword =
                    e.target.value.toLowerCase();

                const filtered =
                    data.filter(project =>

                        project.nama
                            .toLowerCase()
                            .includes(keyword)

                    );

                displayProjects(filtered);

            });

        })

        .catch(error => {

            console.log("ERROR FETCH:", error);

            container.innerHTML =
                "<h2>Gagal memuat data project</h2>";

        });

}

function displayProjects(projects) {

    if (!container) return;

    container.innerHTML = "";

    projects.forEach(project => {

        container.innerHTML += `

        <div class="project-card">

            <img
                src="${project.gambar}"
                alt="${project.nama}"
            >

            <h3>${project.nama}</h3>

            <p>${project.deskripsi}</p>

            <small>${project.kategori}</small>

        </div>

        `;

    });

}

const form =
    document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            alert("Semua field wajib diisi!");
            return;

        }

        document.getElementById("result").innerHTML =
            "✅ Pesan berhasil dikirim!";

        form.reset();

    });

}

window.addEventListener("load",()=>{

    const loading =
        document.getElementById("loading");

    loading.style.transition =
        "opacity .5s";

    setTimeout(()=>{

        loading.style.opacity = "0";

        setTimeout(()=>{
            loading.remove();
        },500);

    },1000);

});