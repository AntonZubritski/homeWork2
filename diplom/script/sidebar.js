let dataToggle = document.getElementById("sidebarToggle");
function sidebar(){
    let sidebar = document.getElementById("sidebar");

    if (sidebar.className.includes("open-sidebar")){
        sidebar.classList.remove("open-sidebar");
    }else {
        sidebar.classList.add("open-sidebar");
    }
}

dataToggle.addEventListener('click', () => sidebar());
