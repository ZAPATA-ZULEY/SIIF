let saldoDisponible = 2000000;
let tarjetaCredito = 2000000;
let prestamos = 2000000;
let movimientos = [];

function login() {
    const usuario = document.getElementById('usuario').value;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('welcome-message').textContent = `BIENVENIDO ${usuario.toUpperCase()}`;
}

function showCreateUser() {
    hideAllScreens();
    document.getElementById('create-user-screen').style.display = 'block';
}

function createAccount() {
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const accountType = document.getElementById('account-type').value;
    const email = document.getElementById('email').value;
    const verificationCode = document.getElementById('verification-code').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (!email || !verificationCode) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    alert(`Cuenta creada exitosamente para ${email} con tipo de cuenta ${accountType}.`);
    login();
}

function showTransfer() {
    hideAllScreens();
    document.getElementById('transfer-screen').style.display = 'block';
    document.getElementById('saldo-disponible').textContent = `Saldo disponible: ${saldoDisponible.toLocaleString()}`;
}

function showWithdrawals() {
    hideAllScreens();
    document.getElementById('withdrawal-screen').style.display = 'block';
    document.getElementById('saldo-disponible-retiro').textContent = `Saldo disponible: ${saldoDisponible.toLocaleString()}`;
}

function processWithdrawal() {
    const monto = parseInt(document.getElementById('monto-retiro').value);
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }
    if (monto > saldoDisponible) {
        alert("Saldo insuficiente");
        return;
    }
    saldoDisponible -= monto;
    movimientos.push({ fecha: new Date().toLocaleDateString(), concepto: 'Retiro', monto: monto });
    document.getElementById('cuenta-ahorro').textContent = `Cuenta de Ahorro: ${saldoDisponible.toLocaleString()}`;
    document.getElementById('withdrawal-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

function showReceipt() {
    const monto = parseInt(document.getElementById('monto').value);
    const tipoCuenta = document.getElementById('tipo-cuenta').value;

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    let saldo;
    if (tipoCuenta === 'Ahorros' || tipoCuenta === 'Corriente') {
        saldo = saldoDisponible;
    } else if (tipoCuenta === 'Tarjetas de Crédito') {
        saldo = tarjetaCredito;
    } else if (tipoCuenta === 'Préstamos') {
        saldo = prestamos;
    }

    if (monto > saldo) {
        alert("Saldo insuficiente");
        return;
    }

    if (tipoCuenta === 'Ahorros' || tipoCuenta === 'Corriente') {
        saldoDisponible -= monto;
    } else if (tipoCuenta === 'Tarjetas de Crédito') {
        tarjetaCredito -= monto;
    } else if (tipoCuenta === 'Préstamos') {
        prestamos -= monto;
    }

    movimientos.push({ fecha: new Date().toLocaleDateString(), concepto: `Transferencia desde ${tipoCuenta}`, monto: monto });

    document.getElementById('valor-enviado').textContent = `Valor enviado: ${monto.toLocaleString()}`;
    document.getElementById('producto-origen').textContent = `Producto Origen: ${tipoCuenta}`;
    document.getElementById('cuenta-ahorro').textContent = `Cuenta de Ahorro: ${saldoDisponible.toLocaleString()}`;
    document.getElementById('tarjeta-credito').textContent = `Tarjeta de crédito: ${tarjetaCredito.toLocaleString()}`;
    document.getElementById('prestamos').textContent = `Préstamos: ${prestamos.toLocaleString()}`;

    document.getElementById('transfer-screen').style.display = 'none';
    document.getElementById('receipt-screen').style.display = 'block';
}
function showBalances() {
    hideAllScreens();
    document.getElementById('balances-screen').style.display = 'block';
    document.getElementById('cuenta-ahorro').textContent = `Cuenta de Ahorro: ${saldoDisponible.toLocaleString()}`;
    document.getElementById('tarjeta-credito').textContent = `Tarjeta de crédito: ${tarjetaCredito.toLocaleString()}`;
    document.getElementById('prestamos').textContent = `Préstamos: ${prestamos.toLocaleString()}`;
}

function showStatement() {
    hideAllScreens();
    document.getElementById('statement-screen').style.display = 'block';
    const tableBody = document.getElementById('movements-table');
    tableBody.innerHTML = '';
    movimientos.forEach(mov => {
        const row = `<tr><td>${mov.fecha}</td><td>${mov.concepto}</td><td>${mov.monto.toLocaleString()}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

function showSettings() {
    hideAllScreens();
    document.getElementById('settings-screen').style.display = 'block';
}

function showCustomerService() {
    hideAllScreens();
    document.getElementById('customer-service-screen').style.display = 'block';
}

function logout() {
    hideAllScreens();
    document.getElementById('login-screen').style.display = 'block';
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.app-container');
    screens.forEach(screen => screen.style.display = 'none');
}

function goBack() {
    hideAllScreens();
    document.getElementById('main-screen').style.display = 'block';
}

function shareReceipt() {
    alert("Comprobante compartido!");
}