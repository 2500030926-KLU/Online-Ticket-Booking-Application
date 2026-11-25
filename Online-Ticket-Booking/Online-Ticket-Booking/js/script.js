/* =====================================================
   TICKETBOOK - MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   BASIC USER FUNCTIONS
===================================================== */

function isLoggedIn() {

    return localStorage.getItem("loggedInUser") !== null;

}


function getLoggedInUser() {

    const user =
        localStorage.getItem("loggedInUser");

    return user ? JSON.parse(user) : null;

}


/* =====================================================
   HOME PAGE - BOOK MOVIE
===================================================== */

function openBooking(movieName) {

    /*
       Save the selected movie first.
    */

    localStorage.setItem(
        "selectedMovie",
        movieName
    );


    /*
       User must login before booking.
    */

    if (!isLoggedIn()) {

        alert(
            "Please login or create an account before booking."
        );

        window.location.href = "login.html";

        return;
    }


    window.location.href = "booking.html";

}


/* =====================================================
   SIGN UP
===================================================== */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "signupName"
                ).value.trim();


            const email =
                document.getElementById(
                    "signupEmail"
                ).value.trim().toLowerCase();


            const phone =
                document.getElementById(
                    "signupPhone"
                ).value.trim();


            const password =
                document.getElementById(
                    "signupPassword"
                ).value;


            /*
               Check existing account.
            */

            const oldUser =
                localStorage.getItem("ticketUser");


            if (oldUser) {

                const user =
                    JSON.parse(oldUser);


                if (user.email === email) {

                    showMessage(
                        "signupMessage",
                        "An account with this email already exists.",
                        "error"
                    );

                    return;
                }

            }


            const newUser = {

                name: name,

                email: email,

                phone: phone,

                password: password

            };


            localStorage.setItem(
                "ticketUser",
                JSON.stringify(newUser)
            );


            showMessage(
                "signupMessage",
                "Account created successfully!",
                "success"
            );


            setTimeout(function() {

                window.location.href =
                    "login.html";

            }, 1000);

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim().toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const storedUser =
                localStorage.getItem("ticketUser");


            if (!storedUser) {

                showMessage(
                    "loginMessage",
                    "No account found. Please create an account first.",
                    "error"
                );

                return;
            }


            const user =
                JSON.parse(storedUser);


            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(user)
                );


                showMessage(
                    "loginMessage",
                    "Login successful!",
                    "success"
                );


                setTimeout(function() {

                    if (
                        localStorage.getItem(
                            "selectedMovie"
                        )
                    ) {

                        window.location.href =
                            "booking.html";

                    } else {

                        window.location.href =
                            "index.html";

                    }

                }, 700);

            } else {

                showMessage(
                    "loginMessage",
                    "Invalid email or password.",
                    "error"
                );

            }

        }
    );

}


/* =====================================================
   MESSAGE FUNCTION
===================================================== */

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        message;


    if (type === "success") {

        element.style.color =
            "#188038";

    } else {

        element.style.color =
            "#d32f2f";

    }

}


/* =====================================================
   NAVBAR USER
===================================================== */

const navUserArea =
    document.getElementById("navUserArea");


if (
    navUserArea &&
    isLoggedIn()
) {

    const user =
        getLoggedInUser();


    navUserArea.innerHTML = `

        <span class="nav-user">
            Hi, ${user.name.split(" ")[0]}
        </span>

        <a
            href="#"
            onclick="logoutUser()">

            Logout

        </a>

    `;

}


function logoutUser() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "index.html";

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const nav =
        document.querySelector(".nav-links");


    if (!nav) {
        return;
    }


    if (
        nav.style.display === "flex"
    ) {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection =
            "column";

        nav.style.position =
            "absolute";

        nav.style.top = "65px";

        nav.style.right = "0";

        nav.style.background =
            "white";

        nav.style.padding = "20px";

        nav.style.width = "220px";

        nav.style.boxShadow =
            "0 8px 20px rgba(0,0,0,0.1)";

    }

}


/* =====================================================
   BOOKING PAGE
===================================================== */

const movieTitle =
    document.getElementById("movieTitle");


if (movieTitle) {

    const movie =
        localStorage.getItem(
            "selectedMovie"
        );


    if (movie) {

        movieTitle.textContent =
            movie + " - Book Tickets";

    }

}


/* =====================================================
   DATE
===================================================== */

const showDate =
    document.getElementById("showDate");


if (showDate) {

    const today =
        new Date()
        .toISOString()
        .split("T")[0];


    showDate.min =
        today;


    showDate.value =
        today;

}


/* =====================================================
   SHOW TIME
===================================================== */

let selectedTime = "";


function selectTime(button) {

    const buttons =
        document.querySelectorAll(
            ".time-btn"
        );


    buttons.forEach(function(btn) {

        btn.classList.remove(
            "selected"
        );

    });


    button.classList.add(
        "selected"
    );


    selectedTime =
        button.textContent.trim();


    localStorage.setItem(
        "selectedTime",
        selectedTime
    );

}


/* =====================================================
   SEATS
===================================================== */

let selectedSeats = [];


const seatButtons =
    document.querySelectorAll(
        ".seat"
    );


if (seatButtons.length > 0) {

    /*
       Some seats are already booked
       for demonstration.
    */

    const bookedSeats = [

        "A3",
        "A4",
        "B6",
        "C2",
        "D7",
        "E3",
        "F6"

    ];


    seatButtons.forEach(
        function(seat) {

            const seatNumber =
                seat.textContent.trim();


            /*
               Disable booked seats.
            */

            if (
                bookedSeats.includes(
                    seatNumber
                )
            ) {

                seat.classList.add(
                    "booked"
                );

                seat.disabled =
                    true;

            }


            /*
               Select / unselect seat.
            */

            seat.addEventListener(
                "click",
                function() {

                    if (
                        seat.classList.contains(
                            "booked"
                        )
                    ) {

                        return;

                    }


                    seat.classList.toggle(
                        "selected"
                    );


                    if (
                        seat.classList.contains(
                            "selected"
                        )
                    ) {

                        selectedSeats.push(
                            seatNumber
                        );

                    } else {

                        selectedSeats =
                            selectedSeats.filter(
                                function(item) {

                                    return (
                                        item !==
                                        seatNumber
                                    );

                                }
                            );

                    }


                    updateBookingSummary();

                }
            );

        }
    );

}


/* =====================================================
   CALCULATE SEAT PRICE
===================================================== */

function getSeatPrice(
    seatNumber
) {

    const row =
        seatNumber.charAt(0);


    if (
        row === "A" ||
        row === "B"
    ) {

        return 250;

    }


    if (
        row === "C" ||
        row === "D"
    ) {

        return 200;

    }


    return 150;

}


/* =====================================================
   UPDATE BOOKING SUMMARY
===================================================== */

function updateBookingSummary() {

    const seatElement =
        document.getElementById(
            "selectedSeats"
        );


    const totalElement =
        document.getElementById(
            "totalPrice"
        );


    if (
        !seatElement ||
        !totalElement
    ) {

        return;

    }


    if (
        selectedSeats.length === 0
    ) {

        seatElement.textContent =
            "None";


        totalElement.textContent =
            "0";


        return;

    }


    seatElement.textContent =
        selectedSeats.join(", ");


    let total = 0;


    selectedSeats.forEach(
        function(seat) {

            total +=
                getSeatPrice(seat);

        }
    );


    totalElement.textContent =
        total;

}


/* =====================================================
   CONTINUE TO PAYMENT
===================================================== */

function continueToPayment() {

    const theater =
        document.getElementById(
            "theater"
        ).value;


    const date =
        document.getElementById(
            "showDate"
        ).value;


    if (!theater) {

        alert(
            "Please select a theater."
        );

        return;

    }


    if (!date) {

        alert(
            "Please select a date."
        );

        return;

    }


    if (!selectedTime) {

        alert(
            "Please select a show time."
        );

        return;

    }


    if (
        selectedSeats.length === 0
    ) {

        alert(
            "Please select at least one seat."
        );

        return;

    }


    const movie =
        localStorage.getItem(
            "selectedMovie"
        );


    let amount = 0;


    selectedSeats.forEach(
        function(seat) {

            amount +=
                getSeatPrice(seat);

        }
    );


    const booking = {

        movie: movie,

        theater: theater,

        date: date,

        time: selectedTime,

        seats: selectedSeats,

        amount: amount

    };


    localStorage.setItem(
        "currentBooking",
        JSON.stringify(booking)
    );


    window.location.href =
        "payment.html";

}


/* =====================================================
   PAYMENT PAGE
===================================================== */

const confirmBookingBtn =
    document.getElementById(
        "confirmBookingBtn"
    );


if (confirmBookingBtn) {

    const booking =
        JSON.parse(
            localStorage.getItem(
                "currentBooking"
            )
        );


    if (!booking) {

        showMessage(
            "paymentMessage",
            "Booking details not found.",
            "error"
        );

        confirmBookingBtn.disabled =
            true;

    } else {

        document.getElementById(
            "paymentMovie"
        ).textContent =
            booking.movie;


        document.getElementById(
            "paymentTheater"
        ).textContent =
            booking.theater;


        document.getElementById(
            "paymentDate"
        ).textContent =
            formatDate(
                booking.date
            );


        document.getElementById(
            "paymentTime"
        ).textContent =
            booking.time;


        document.getElementById(
            "paymentSeats"
        ).textContent =
            booking.seats.join(", ");


        document.getElementById(
            "paymentAmount"
        ).textContent =
            booking.amount;


        confirmBookingBtn.addEventListener(
            "click",
            confirmBooking
        );

    }

}


/* =====================================================
   CONFIRM BOOKING
===================================================== */

function confirmBooking() {

    const booking =
        JSON.parse(
            localStorage.getItem(
                "currentBooking"
            )
        );


    if (!booking) {

        return;

    }


    const bookingId =
        "TB" +
        Date.now()
            .toString()
            .slice(-8);


    booking.bookingId =
        bookingId;


    booking.paymentStatus =
        "Confirmed";


    /*
       Save latest confirmed ticket.
    */

    localStorage.setItem(
        "confirmedBooking",
        JSON.stringify(booking)
    );


    /*
       Add to ticket history.
    */

    let tickets =
        JSON.parse(
            localStorage.getItem(
                "ticketHistory"
            )
        ) || [];


    tickets.push(booking);


    localStorage.setItem(
        "ticketHistory",
        JSON.stringify(tickets)
    );


    /*
       Save booking for admin.
    */

    let adminBookings =
        JSON.parse(
            localStorage.getItem(
                "adminBookings"
            )
        ) || [];


    adminBookings.push(booking);


    localStorage.setItem(
        "adminBookings",
        JSON.stringify(
            adminBookings
        )
    );


    showMessage(
        "paymentMessage",
        "Booking confirmed! Generating your ticket...",
        "success"
    );


    setTimeout(
        function() {

            window.location.href =
                "ticket.html";

        },
        900
    );

}


/* =====================================================
   TICKET PAGE
===================================================== */

const ticketMovie =
    document.getElementById(
        "ticketMovie"
    );


if (ticketMovie) {

    const booking =
        JSON.parse(
            localStorage.getItem(
                "confirmedBooking"
            )
        );


    if (!booking) {

        ticketMovie.textContent =
            "Booking Not Found";

    } else {

        document.getElementById(
            "ticketMovie"
        ).textContent =
            booking.movie;


        document.getElementById(
            "ticketTheater"
        ).textContent =
            booking.theater;


        document.getElementById(
            "ticketDate"
        ).textContent =
            formatDate(
                booking.date
            );


        document.getElementById(
            "ticketTime"
        ).textContent =
            booking.time;


        document.getElementById(
            "ticketSeats"
        ).textContent =
            booking.seats.join(", ");


        document.getElementById(
            "ticketAmount"
        ).textContent =
            booking.amount;


        document.getElementById(
            "bookingId"
        ).textContent =
            booking.bookingId;

    }

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
    dateString
) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =====================================================
   MY TICKETS
===================================================== */

const myTicketsContainer =
    document.getElementById(
        "myTicketsContainer"
    );


if (myTicketsContainer) {

    displayMyTickets();

}


function displayMyTickets() {

    const tickets =
        JSON.parse(
            localStorage.getItem(
                "ticketHistory"
            )
        ) || [];


    if (tickets.length === 0) {

        myTicketsContainer.innerHTML = `

            <div class="empty-ticket">

                <div>🎟️</div>

                <h2>
                    No Tickets Yet
                </h2>

                <p>
                    Your confirmed movie bookings
                    will appear here.
                </p>

                <br>

                <a
                    href="index.html"
                    class="primary-btn">

                    Browse Movies

                </a>

            </div>

        `;

        return;

    }


    myTicketsContainer.innerHTML = "";


    tickets
        .slice()
        .reverse()
        .forEach(
            function(ticket) {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "saved-ticket";


                div.innerHTML = `

                    <div>

                        <h2>
                            ${ticket.movie}
                        </h2>

                        <p>
                            ${ticket.theater}
                        </p>

                        <p>
                            ${formatDate(ticket.date)}
                            • ${ticket.time}
                        </p>

                        <p>
                            Seats:
                            ${ticket.seats.join(", ")}
                        </p>

                        <p class="saved-ticket-id">
                            Booking ID:
                            ${ticket.bookingId}
                        </p>

                    </div>


                    <div>

                        <strong>
                            ₹${ticket.amount}
                        </strong>

                        <br><br>

                        <button
                            class="primary-btn"
                            onclick="viewTicket(
                                '${ticket.bookingId}'
                            )">

                            View Ticket

                        </button>

                    </div>

                `;


                myTicketsContainer.appendChild(
                    div
                );

            }
        );

}


function viewTicket(
    bookingId
) {

    const tickets =
        JSON.parse(
            localStorage.getItem(
                "ticketHistory"
            )
        ) || [];


    const ticket =
        tickets.find(
            function(item) {

                return (
                    item.bookingId ===
                    bookingId
                );

            }
        );


    if (!ticket) {

        return;

    }


    localStorage.setItem(
        "confirmedBooking",
        JSON.stringify(ticket)
    );


    window.location.href =
        "ticket.html";

}


/* =====================================================
   ADMIN MODULE
===================================================== */

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );


if (adminLoginForm) {

    /*
       Check whether admin is already logged in.
    */

    if (
        localStorage.getItem(
            "adminLoggedIn"
        ) === "true"
    ) {

        showAdminDashboard();

    }


    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "adminEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "adminPassword"
                ).value;


            /*
               Demo admin credentials.
            */

            if (
                email ===
                    "admin@ticketbook.com" &&
                password ===
                    "admin123"
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                showAdminDashboard();

            } else {

                showMessage(
                    "adminLoginMessage",
                    "Invalid admin credentials.",
                    "error"
                );

            }

        }
    );

}


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function showAdminDashboard() {

    const login =
        document.getElementById(
            "adminLogin"
        );


    const dashboard =
        document.getElementById(
            "adminDashboard"
        );


    if (!login || !dashboard) {

        return;

    }


    login.classList.add(
        "hidden"
    );


    dashboard.classList.remove(
        "hidden"
    );


    loadAdminData();

}


/* =====================================================
   ADMIN DATA
===================================================== */

function getAdminMovies() {

    let movies =
        JSON.parse(
            localStorage.getItem(
                "adminMovies"
            )
        );


    if (!movies) {

        movies = [

            {
                name: "Paradise",
                language: "Telugu",
                genre: "Drama / Thriller"
            },

            {
                name: "RRR",
                language: "Telugu",
                genre: "Action / Drama"
            },

            {
                name: "Devara",
                language: "Telugu",
                genre: "Action"
            },

            {
                name: "Pushpa 2",
                language: "Telugu",
                genre: "Action / Drama"
            },

            {
                name: "Salaar",
                language: "Telugu",
                genre: "Action / Thriller"
            },

            {
                name: "OG",
                language: "Telugu",
                genre: "Action / Drama"
            }

        ];


        localStorage.setItem(
            "adminMovies",
            JSON.stringify(movies)
        );

    }


    return movies;

}


/* =====================================================
   LOAD ADMIN DATA
===================================================== */

function loadAdminData() {

    const movies =
        getAdminMovies();


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "adminBookings"
            )
        ) || [];


    const user =
        localStorage.getItem(
            "ticketUser"
        );


    document.getElementById(
        "movieCount"
    ).textContent =
        movies.length;


    document.getElementById(
        "bookingCount"
    ).textContent =
        bookings.length;


    document.getElementById(
        "userCount"
    ).textContent =
        user ? "1" : "0";


    let revenue = 0;


    bookings.forEach(
        function(booking) {

            revenue +=
                Number(
                    booking.amount
                );

        }
    );


    document.getElementById(
        "revenue"
    ).textContent =
        revenue;


    displayAdminMovies(
        movies
    );


    displayAdminBookings(
        bookings
    );

}


/* =====================================================
   DISPLAY ADMIN MOVIES
===================================================== */

function displayAdminMovies(
    movies
) {

    const list =
        document.getElementById(
            "adminMovieList"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    movies.forEach(
        function(movie, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-list-item";


            item.innerHTML = `

                <div>

                    <h3>
                        ${movie.name}
                    </h3>

                    <p>
                        ${movie.language}
                        •
                        ${movie.genre}
                    </p>

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteAdminMovie(${index})">

                    Delete

                </button>

            `;


            list.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   ADD MOVIE
===================================================== */

const addMovieForm =
    document.getElementById(
        "addMovieForm"
    );


if (addMovieForm) {

    addMovieForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "adminMovieName"
                ).value.trim();


            const language =
                document.getElementById(
                    "adminMovieLanguage"
                ).value.trim();


            const genre =
                document.getElementById(
                    "adminMovieGenre"
                ).value.trim();


            const movies =
                getAdminMovies();


            movies.push({

                name: name,

                language: language,

                genre: genre

            });


            localStorage.setItem(
                "adminMovies",
                JSON.stringify(
                    movies
                )
            );


            addMovieForm.reset();


            loadAdminData();


            alert(
                "Movie added successfully."
            );

        }
    );

}


/* =====================================================
   DELETE MOVIE
===================================================== */

function deleteAdminMovie(
    index
) {

    const movies =
        getAdminMovies();


    movies.splice(
        index,
        1
    );


    localStorage.setItem(
        "adminMovies",
        JSON.stringify(
            movies
        )
    );


    loadAdminData();

}


/* =====================================================
   ADMIN BOOKINGS
===================================================== */

function displayAdminBookings(
    bookings
) {

    const list =
        document.getElementById(
            "adminBookingList"
        );


    if (!list) {

        return;

    }


    if (bookings.length === 0) {

        list.innerHTML = `

            <div class="empty-ticket">

                No bookings available yet.

            </div>

        `;

        return;

    }


    list.innerHTML = "";


    bookings
        .slice()
        .reverse()
        .forEach(
            function(booking) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "admin-list-item";


                item.innerHTML = `

                    <div>

                        <h3>
                            ${booking.movie}
                        </h3>

                        <p>
                            ${booking.theater}
                            •
                            ${formatDate(booking.date)}
                            •
                            ${booking.time}
                        </p>

                        <p>
                            Seats:
                            ${booking.seats.join(", ")}
                        </p>

                    </div>


                    <div>

                        <strong>
                            ₹${booking.amount}
                        </strong>

                        <p>
                            ${booking.bookingId}
                        </p>

                    </div>

                `;


                list.appendChild(
                    item
                );

            }
        );

}


/* =====================================================
   ADMIN LOGOUT
===================================================== */

function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );


    window.location.reload();

}