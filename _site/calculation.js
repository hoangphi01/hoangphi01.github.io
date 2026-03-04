// Helpers for BigInt parsing

function parseBigInt(valueStr) {
    const trimmed = valueStr.trim();
    if (trimmed === '') {
        throw new Error('Empty input');
    }
    return BigInt(trimmed);
}

function modBigInt(x, y) {
    if (y === 0n) {
        throw new Error('Modulo by zero');
    }
    let r = x % y;
    if (r < 0n) {
        r += y;
    }
    return r;
}

// 1. Modular arithmetic

function basicModCompute(a, b, n) {
    const aMod = modBigInt(a, n);
    const bMod = modBigInt(b, n);
    const add = modBigInt(a + b, n);
    const sub = modBigInt(a - b, n);
    const mul = modBigInt(a * b, n);

    return {
        aMod,
        bMod,
        add,
        sub,
        mul
    };
}

function xorBigInt(a, b) {
    return a ^ b;
}

// 2. Vigenere cipher

function textToNums(text) {
    const base = 'a'.charCodeAt(0);
    const nums = [];
    text = text.toLowerCase();

    for (const c of text) {
        nums.push(c.charCodeAt(0) - base);
    }
    return nums;
}

function numsToText(nums) {
    const base = 'a'.charCodeAt(0);
    return nums.map(n => String.fromCharCode(n + base)).join('');
}

function vigenereEnc(messageNums, keyNums) {
    const cipherNums = [];
    for (let i = 0; i < messageNums.length; i++) {
        const m = messageNums[i];
        const k = keyNums[i % keyNums.length];
        cipherNums.push((m + k) % 26);
    }
    return cipherNums;
}

function vigenereDec(cipherNums, keyNums) {
    const messageNums = [];
    for (let i = 0; i < cipherNums.length; i++) {
        const c = cipherNums[i];
        const k = keyNums[i % keyNums.length];
        const val = ((c - k) % 26 + 26) % 26;
        messageNums.push(val);
    }
    return messageNums;
}

// 3. Euclidean algorithms and fast exponentiation

function gcdBigInt(a, b) {
    let x = a < 0n ? -a : a;
    let y = b < 0n ? -b : b;
    while (y !== 0n) {
        const t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function extendedGcdBigInt(a, b) {
    let oldR = a;
    let r = b;
    let oldS = 1n;
    let s = 0n;
    let oldT = 0n;
    let t = 1n;

    while (r !== 0n) {
        const q = oldR / r;
        const tmpR = r;
        r = oldR - q * r;
        oldR = tmpR;

        const tmpS = s;
        s = oldS - q * s;
        oldS = tmpS;

        const tmpT = t;
        t = oldT - q * t;
        oldT = tmpT;
    }

    return {
        g: oldR,
        x: oldS,
        y: oldT
    };
}

function invMod(a, m) {
    const eg = extendedGcdBigInt(a, m);
    if (eg.g !== 1n && eg.g !== -1n) {
        throw new Error('Inverse does not exist because gcd(a, m) != 1');
    }
    let x = eg.x;
    if (eg.g === -1n) {
        x = -x;
    }
    return modBigInt(x, m);
}

function modPowFast(base, exponent, modulus) {
    if (modulus === 0n) {
        throw new Error('Modulo by zero');
    }
    if (exponent < 0n) {
        throw new Error('Negative exponent is not supported for mod');
    }

    base = modBigInt(base, modulus);
    let result = 1n;
    let exp = exponent;
    let b = base;

    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = modBigInt(result * b, modulus);
        }
        b = modBigInt(b * b, modulus);
        exp = exp / 2n;
    }
    return result;
}

// 4. Number theory: phi, factorization, order, primitive root

function factorPrimeBigInt(n) {
    let m = n;
    const factors = [];
    let p = 2n;

    while (p * p <= m) {
        if (m % p === 0n) {
            factors.push(p);
            while (m % p === 0n) {
                m = m / p;
            }
        }
        p = p === 2n ? 3n : p + 2n;
    }
    if (m > 1n) {
        factors.push(m);
    }
    return factors;
}

function phiBigInt(n) {
    if (n <= 0n) {
        throw new Error('n must be positive for phi');
    }
    let result = n;
    let m = n;
    let p = 2n;

    while (p * p <= m) {
        if (m % p === 0n) {
            while (m % p === 0n) {
                m = m / p;
            }
            result = result / p * (p - 1n);
        }
        p = p === 2n ? 3n : p + 2n;
    }
    if (m > 1n) {
        result = result / m * (m - 1n);
    }
    return result;
}

function orderMod(a, n) {
    if (n === 0n) {
        throw new Error('Modulo by zero');
    }
    const g = gcdBigInt(a, n);
    if (g !== 1n) {
        throw new Error(`gcd(${a.toString()}, ${n.toString()}) = ${g.toString()} so order does not exist`);
    }

    const base = modBigInt(a, n);
    let value = base;
    let k = 1n;

    let limit;
    try {
        limit = phiBigInt(n);
    } catch {
        limit = n;
    }

    while (k <= limit) {
        if (value === 1n) {
            return {
                order: k,
                limit: limit
            };
        }
        value = modBigInt(value * base, n);
        k += 1n;
    }
    throw new Error('Order not found up to theoretical limit');
}

function isGeneratorModPrime(g, p) {
    if (p <= 2n) {
        throw new Error('p must be an odd prime');
    }
    const phi = p - 1n;
    const factors = factorPrimeBigInt(phi);

    for (const q of factors) {
        const exp = phi / q;
        const val = modPowFast(g, exp, p);
        if (val === 1n) {
            return {
                isGenerator: false,
                factors
            };
        }
    }
    return {
        isGenerator: true,
        factors
    };
}

// 5. Diffie Hellman helper

function discreteLogBruteforce(g, value, p) {
    const maxIter = p - 1n;
    let current = 1n;
    for (let x = 0n; x <= maxIter; x++) {
        if (current === value) {
            return x;
        }
        current = modBigInt(current * g, p);
    }
    throw new Error('Cannot find exponent x such that g^x ≡ value (mod p). Maybe g is not a generator or p is too large.');
}

// 6. Alphabet and number converters

function lettersToNumbers(text) {
    const base = 'A'.charCodeAt(0);
    const result = [];
    for (const ch of text.toUpperCase()) {
        if (ch >= 'A' && ch <= 'Z') {
            result.push(ch.charCodeAt(0) - base);
        }
    }
    return result;
}

function numbersToLetters(nums) {
    const base = 'A'.charCodeAt(0);
    let result = '';
    for (const n of nums) {
        if (Number.isNaN(n)) {
            result += '?';
        } else if (n >= 0 && n <= 25) {
            result += String.fromCharCode(base + n);
        } else {
            result += '?';
        }
    }
    return result;
}

// 7. Decimal and binary

function decimalToBinary(decStr) {
    const trimmed = decStr.trim();
    if (trimmed === '') {
        throw new Error('Empty input');
    }
    const n = BigInt(trimmed);
    return n.toString(2);
}

function binaryToDecimal(binStr) {
    const trimmed = binStr.trim();
    if (!/^[01]+$/.test(trimmed)) {
        throw new Error('Binary string must contain only 0 and 1');
    }
    return BigInt('0b' + trimmed).toString(10);
}

// Wire up events

document.addEventListener('DOMContentLoaded', function () {

    // Basic modular arithmetic
    const basicModForm = document.getElementById('basicModForm');
    const basicModResult = document.getElementById('basicModResult');

    basicModForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('basicA').value;
        const bStr = document.getElementById('basicB').value;
        const nStr = document.getElementById('basicN').value;

        try {
            const a = parseBigInt(aStr);
            const b = parseBigInt(bStr);
            const n = parseBigInt(nStr);

            const res = basicModCompute(a, b, n);
            basicModResult.textContent =
                `a mod n = ${res.aMod.toString()}\n` +
                `b mod n = ${res.bMod.toString()}\n` +
                `(a + b) mod n = ${res.add.toString()}\n` +
                `(a - b) mod n = ${res.sub.toString()}\n` +
                `(a * b) mod n = ${res.mul.toString()}`;
        } catch (err) {
            basicModResult.textContent = 'Error: ' + err.message;
        }
    });

    // XOR
    const xorForm = document.getElementById('xorForm');
    const xorResult = document.getElementById('xorResult');

    xorForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('xorA').value.trim();
        const bStr = document.getElementById('xorB').value.trim();
        const mode = document.querySelector('input[name="xorMode"]:checked').value;

        try {
            let a, b;

            if (mode === 'int') {
                a = parseBigInt(aStr);
                b = parseBigInt(bStr);
            } else {
                if (!/^[01]+$/.test(aStr) || !/^[01]+$/.test(bStr)) {
                    throw new Error('Binary mode requires only 0 and 1');
                }
                a = BigInt('0b' + aStr);
                b = BigInt('0b' + bStr);
            }

            const c = xorBigInt(a, b);
            xorResult.textContent =
                `A XOR B (decimal) = ${c.toString()}\n` +
                `A XOR B (binary)  = ${c.toString(2)}`;
        } catch (err) {
            xorResult.textContent = 'Error: ' + err.message;
        }
    });

    // Vigenere
    const vigenereForm = document.getElementById('vigenereForm');
    const vigResult = document.getElementById('vigResult');

    vigenereForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const message = document.getElementById('vigMessage').value.trim().toLowerCase();
        const key = document.getElementById('vigKey').value.trim().toLowerCase();
        const mode = document.querySelector('input[name="vigMode"]:checked').value;

        if (!message || !key) {
            vigResult.textContent = 'Message and key must not be empty';
            return;
        }

        const messageNums = textToNums(message);
        const keyNums = textToNums(key);

        try {
            let output = '';
            if (mode === 'encrypt') {
                const cipherNums = vigenereEnc(messageNums, keyNums);
                output = numsToText(cipherNums);
            } else {
                const cipherNums = messageNums;
                const plainNums = vigenereDec(cipherNums, keyNums);
                output = numsToText(plainNums);
            }
            vigResult.textContent = output;
        } catch (err) {
            vigResult.textContent = 'Error: ' + err.message;
        }
    });

    // GCD
    const gcdForm = document.getElementById('gcdForm');
    const invForm = document.getElementById('invForm');
    const gcdResult = document.getElementById('gcdResult');

    gcdForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('gcdA').value;
        const bStr = document.getElementById('gcdB').value;

        try {
            const a = parseBigInt(aStr);
            const b = parseBigInt(bStr);
            const eg = extendedGcdBigInt(a, b);
            gcdResult.textContent =
                `gcd(a, b) = ${eg.g.toString()}\n` +
                `x = ${eg.x.toString()}, y = ${eg.y.toString()}\n` +
                `a*x + b*y = ${eg.g.toString()}`;
        } catch (err) {
            gcdResult.textContent = 'Error: ' + err.message;
        }
    });

    // Inverse mod
    invForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('invA').value;
        const nStr = document.getElementById('invN').value;

        try {
            const a = parseBigInt(aStr);
            const n = parseBigInt(nStr);
            const inv = invMod(a, n);
            gcdResult.textContent = `Inverse: ${a.toString()}^(-1) mod ${n.toString()} = ${inv.toString()}`;
        } catch (err) {
            gcdResult.textContent = 'Error: ' + err.message;
        }
    });

    // Fast exponentiation
    const powForm = document.getElementById('powForm');
    const powResult = document.getElementById('powResult');
    const powDirectResult = document.getElementById('powDirectResult');

    powForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const baseStr = document.getElementById('powBase').value;
        const expStr = document.getElementById('powExp').value;
        const modStr = document.getElementById('powMod').value;

        try {
            const base = parseBigInt(baseStr);
            const exponent = parseBigInt(expStr);
            const modulus = parseBigInt(modStr);

            const fast = modPowFast(base, exponent, modulus);
            powResult.textContent = `Fast exponentiation: ${base.toString()}^${exponent.toString()} mod ${modulus.toString()} = ${fast.toString()}`;

            let directText = '';
            if (exponent < 0n) {
                directText = 'Direct BigInt power for negative exponent is not supported';
            } else {
                const direct = (base ** exponent) % modulus;
                directText = `Direct BigInt: ${base.toString()}^${exponent.toString()} mod ${modulus.toString()} = ${direct.toString()}`;
                if (direct === fast) {
                    directText += '\nCheck: results match';
                } else {
                    directText += '\nWarning: results differ';
                }
            }
            powDirectResult.textContent = directText;
        } catch (err) {
            powResult.textContent = 'Error: ' + err.message;
            powDirectResult.textContent = '';
        }
    });

    // Order modulo n
    const orderForm = document.getElementById('orderForm');
    const orderResult = document.getElementById('orderResult');

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('orderA').value;
        const nStr = document.getElementById('orderN').value;

        try {
            const a = parseBigInt(aStr);
            const n = parseBigInt(nStr);
            const g = gcdBigInt(a, n);
            if (g !== 1n) {
                orderResult.textContent = `gcd(${a.toString()}, ${n.toString()}) = ${g.toString()} so order does not exist`;
                return;
            }
            const res = orderMod(a, n);
            let extra = '';
            try {
                const phi = phiBigInt(n);
                const divides = phi % res.order === 0n;
                extra = `\nphi(n) = ${phi.toString()}, ord divides phi(n)? ${divides}`;
            } catch {
                extra = '';
            }
            orderResult.textContent = `ord_${n.toString()}(${a.toString()}) = ${res.order.toString()}${extra}`;
        } catch (err) {
            orderResult.textContent = 'Error: ' + err.message;
        }
    });

    // Euler phi and Euler theorem
    const phiForm = document.getElementById('phiForm');
    const eulerForm = document.getElementById('eulerForm');
    const fermForm = document.getElementById('fermForm');
    const phiResult = document.getElementById('phiResult');

    phiForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nStr = document.getElementById('phiN').value;

        try {
            const n = parseBigInt(nStr);
            const phi = phiBigInt(n);
            phiResult.textContent = `phi(${n.toString()}) = ${phi.toString()}`;
        } catch (err) {
            phiResult.textContent = 'Error: ' + err.message;
        }
    });

    eulerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('eulerA').value;
        const nStr = document.getElementById('eulerN').value;

        try {
            const a = parseBigInt(aStr);
            const n = parseBigInt(nStr);
            const g = gcdBigInt(a, n);
            const phi = phiBigInt(n);
            const val = modPowFast(a, phi, n);
            phiResult.textContent =
                `gcd(${a.toString()}, ${n.toString()}) = ${g.toString()}\n` +
                `phi(${n.toString()}) = ${phi.toString()}\n` +
                `${a.toString()}^phi(n) mod n = ${val.toString()}`;
        } catch (err) {
            phiResult.textContent = 'Error: ' + err.message;
        }
    });

    fermForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const aStr = document.getElementById('fermA').value;
        const pStr = document.getElementById('fermP').value;

        try {
            const a = parseBigInt(aStr);
            const p = parseBigInt(pStr);
            const val = modPowFast(a, p - 1n, p);
            phiResult.textContent =
                `${a.toString()}^(p-1) mod p = ${val.toString()} (assumes p is prime)`;
        } catch (err) {
            phiResult.textContent = 'Error: ' + err.message;
        }
    });

    // Primitive root test
    const generatorForm = document.getElementById('generatorForm');
    const genResult = document.getElementById('genResult');

    generatorForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const gStr = document.getElementById('genG').value;
        const pStr = document.getElementById('genP').value;

        try {
            const g = parseBigInt(gStr);
            const p = parseBigInt(pStr);

            const gcdgp = gcdBigInt(g, p);
            if (gcdgp !== 1n) {
                genResult.textContent = `gcd(${g.toString()}, ${p.toString()}) = ${gcdgp.toString()} so g cannot be a generator`;
                return;
            }

            const info = isGeneratorModPrime(g, p);
            const factorsText = info.factors.map(f => f.toString()).join(', ');
            if (info.isGenerator) {
                genResult.textContent =
                    `${g.toString()} is a generator modulo ${p.toString()}\n` +
                    `Prime factors of p-1: ${factorsText}`;
            } else {
                genResult.textContent =
                    `${g.toString()} is NOT a generator modulo ${p.toString()}\n` +
                    `Prime factors of p-1: ${factorsText}`;
            }
        } catch (err) {
            genResult.textContent = 'Error: ' + err.message;
        }
    });

    // Diffie Hellman
    const dhForm = document.getElementById('dhForm');
    const dhResult = document.getElementById('dhResult');

    dhForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const pStr = document.getElementById('dhP').value;
        const gStr = document.getElementById('dhG').value;
        const aStr = document.getElementById('dhA').value;
        const bStr = document.getElementById('dhB').value;

        try {
            const p = parseBigInt(pStr);
            const g = parseBigInt(gStr);
            const A = parseBigInt(aStr);
            const B = parseBigInt(bStr);

            if (p <= 2n) {
                throw new Error('p must be an odd prime greater than 2 for this demo');
            }

            if (p > 200000n) {
                throw new Error('p is too large for brute force discrete log in this demo. Use small lab examples.');
            }

            const x = discreteLogBruteforce(g, modBigInt(A, p), p);
            const y = discreteLogBruteforce(g, modBigInt(B, p), p);

            const K_A = modPowFast(B, x, p);
            const K_B = modPowFast(A, y, p);

            let text = '';
            text += `Public parameters: p = ${p.toString()}, g = ${g.toString()}\n`;
            text += `Public keys: A = ${A.toString()}, B = ${B.toString()}\n\n`;
            text += `Step 1: Find Alice secret x such that g^x ≡ A (mod p).\n`;
            text += `        Found x = ${x.toString()} because g^x mod p = ${modPowFast(g, x, p).toString()}\n\n`;
            text += `Step 2: Find Bob secret y such that g^y ≡ B (mod p).\n`;
            text += `        Found y = ${y.toString()} because g^y mod p = ${modPowFast(g, y, p).toString()}\n\n`;
            text += `Step 3: Alice computes K_A = B^x mod p = ${K_A.toString()}\n`;
            text += `Step 4: Bob computes K_B = A^y mod p = ${K_B.toString()}\n\n`;

            if (K_A === K_B) {
                text += `Shared secret K = ${K_A.toString()}\n`;
                text += `Check: K_A and K_B are equal so the shared key is consistent.`;
            } else {
                text += `Warning: K_A != K_B so something is inconsistent in the inputs.`;
            }

            dhResult.textContent = text;
        } catch (err) {
            dhResult.textContent = 'Error: ' + err.message;
        }
    });

    // Alphabet converters
    const alphaToNumForm = document.getElementById('alphaToNumForm');
    const alphaToNumResult = document.getElementById('alphaToNumResult');

    alphaToNumForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = document.getElementById('alphaInput').value;
        const nums = lettersToNumbers(text);
        alphaToNumResult.textContent = nums.join(' ');
    });

    const numToAlphaForm = document.getElementById('numToAlphaForm');
    const numToAlphaResult = document.getElementById('numToAlphaResult');

    numToAlphaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.getElementById('numInput').value.trim();
        if (!input) {
            numToAlphaResult.textContent = 'Input must not be empty';
            return;
        }
        const parts = input.split(/\s+/);
        const nums = [];
        for (const p of parts) {
            const n = Number(p);
            if (Number.isNaN(n)) {
                nums.push(NaN);
            } else {
                nums.push(n);
            }
        }
        const letters = numbersToLetters(nums);
        numToAlphaResult.textContent = letters;
    });

    // Decimal and binary
    const decToBinForm = document.getElementById('decToBinForm');
    const decToBinResult = document.getElementById('decToBinResult');

    decToBinForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const decStr = document.getElementById('decInput').value;
        try {
            const bin = decimalToBinary(decStr);
            decToBinResult.textContent = bin;
        } catch (err) {
            decToBinResult.textContent = 'Error: ' + err.message;
        }
    });

    const binToDecForm = document.getElementById('binToDecForm');
    const binToDecResult = document.getElementById('binToDecResult');

    binToDecForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const binStr = document.getElementById('binInput').value;
        try {
            const dec = binaryToDecimal(binStr);
            binToDecResult.textContent = dec;
        } catch (err) {
            binToDecResult.textContent = 'Error: ' + err.message;
        }
    });
});
