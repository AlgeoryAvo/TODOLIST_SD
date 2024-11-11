// Array untuk menyimpan semua tugas
let tasks = []; // Array utama untuk menyimpan semua objek tugas yang ditambahkan oleh pengguna
let undoStack = []; // Stack untuk menyimpan tugas yang dihapus sementara untuk fitur "Undo"

// Fungsi untuk menambahkan tugas baru ke array dan menampilkannya di daftar
function addTask() {
  const taskInput = document.getElementById("taskInput"); // Mengambil elemen input dari HTML
  const taskText = taskInput.value.trim(); // Mengambil teks dari input dan menghapus spasi di awal dan akhir
  
  function enqueueTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      const task = { name: taskText };
      tasks.push(task); // Menambahkan tugas ke akhir array
      taskInput.value = "";
      renderTasks();
    } else {
      alert("Tambahkan list yang ingin dibuat...");
    }
  }

  // Jika pengguna memasukkan teks
  if (taskText !== "") {
    const task = {
      name: taskText,      // Nama tugas yang diambil dari input pengguna
    };
    tasks.push(task);     // Menambahkan objek tugas ke array "tasks"
    taskInput.value = ""; // Mengosongkan input setelah tugas ditambahkan
    renderTasks();        // Memperbarui tampilan daftar tugas di halaman
  } else {
    // Jika input kosong, tampilkan pesan peringatan
    alert("Please enter a task!");
  }
}

// Fungsi untuk menghapus tugas dari daftar dan menambahkannya ke stack untuk fitur "Undo"
function deleteTask(index) {
  undoStack.push(tasks[index]); // Menyimpan tugas yang akan dihapus ke dalam stack "undoStack"
  tasks.splice(index, 1);       // Menghapus tugas dari array "tasks" berdasarkan indeks
  renderTasks();                // Memperbarui tampilan daftar tugas di halaman
}

// Fungsi untuk mengembalikan tugas terakhir yang dihapus menggunakan stack "undoStack"
function undo() {
  if (undoStack.length > 0) {              // Cek apakah stack "undoStack" berisi tugas yang bisa dikembalikan
    const lastDeletedTask = undoStack.pop(); // Mengambil tugas terakhir dari stack
    tasks.push(lastDeletedTask);            // Menambahkan kembali tugas ke array "tasks"
    renderTasks();                          // Memperbarui tampilan daftar tugas di halaman
  } else {
    // Jika tidak ada tugas yang bisa dikembalikan, tampilkan pesan
    alert("Nothing to undo!");
  }
}

// Fungsi untuk mencari tugas berdasarkan nama
function searchTask() {
  const searchInput = document.getElementById("searchInput").value.trim(); // Mengambil teks pencarian dan menghapus spasi

  // Cek apakah input pencarian kosong
  if (searchInput === "") {
    const searchListElement = document.getElementById("searchResults"); 
    searchListElement.innerHTML = "" 
    alert("Tuliskan sesuatu!"); // Tampilkan notifikasi jika input pencarian kosong
    return; // Hentikan fungsi jika input kosong
  }

  // Filter array "tasks" untuk mencari tugas yang mengandung teks pencarian
  const result = tasks.filter(task => task.name.includes(searchInput));
  renderSearchResults(result); // Tampilkan hasil pencarian
}

// Fungsi untuk menampilkan hasil pencarian dalam daftar HTML
function renderSearchResults(results) {
  const searchListElement = document.getElementById("searchResults"); // Mengambil elemen HTML untuk menampilkan hasil pencarian
  searchListElement.innerHTML = results.map(task => `<li>${task.name}</li>`).join(''); // Mengubah hasil pencarian menjadi elemen <li> dan menambahkannya ke HTML
}

// Fungsi untuk menampilkan semua tugas di halaman HTML
function renderTasks() {
  const taskList = document.getElementById("taskList"); // Mengambil elemen HTML yang akan menampung daftar tugas
  taskList.innerHTML = ""; // Mengosongkan elemen sebelum memperbarui

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li"); // Membuat elemen <li> untuk setiap tugas
    listItem.innerHTML = `${task.name} <span class="delete-btn" onclick="deleteTask(${index})">X</span>`; // Menambahkan nama tugas dan tombol hapus
    taskList.appendChild(listItem); // Menambahkan elemen <li> ke dalam daftar
  });
}

// Mengganti fungsi sort dengan handler untuk dropdown
function handleSort(value) {
  switch(value) {
    case 'asc':
      tasks.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'desc':
      tasks.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      return;
  }
  renderTasks();
}

//menambah queue dan stack

function enqueueTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = { name: taskText };
    tasks.push(task); // Menambahkan tugas ke akhir array
    taskInput.value = "";
    renderTasks();
  } else {
    alert("Tambahkan list yang ingin dibuat...");
  }
}