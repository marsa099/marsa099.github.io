const span = document.getElementById('inputText');
const blinkingCursor = document.getElementById('blinkingCursor');
const max = 3;
const min = 1;
const delay = 20;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeCommand(textToType) {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    await sleep(rand * delay * 5);

    for (let i = 0; i < textToType.length; i++) {
        const charDelay = Math.floor(Math.random() * (max - min + 1) + min);
        span.innerHTML += textToType[i];
        await sleep(charDelay * delay);
    }
    newLine();
}

async function newLine(addDollarSign = true) {
    const elem = document.createElement('span');
    elem.appendChild(document.createElement('br'));

    if (addDollarSign) {
        const dollarSign = document.createElement('span');
        const dollarText = document.createTextNode('$ ');
        dollarSign.classList.add("text");
        dollarSign.appendChild(dollarText);
        elem.appendChild(dollarSign);
    }

    span.appendChild(elem);

    if (blinkingCursor) {
        blinkingCursor.scrollIntoView();
    }
}

async function printGitStatus() {
    span.innerHTML += "On branch main<br>Changes not staged for commit:<br>&nbsp;&nbsp;(use \"git add &lt;file&gt;...\" to update what will be committed)<br>&nbsp;&nbsp;(use \"git restore &lt;file&gt;...\" to discard changes in working directory)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=\"red\">modified:&nbsp;&nbsp;index.html</font><br><br>no changes added to commit (use \"git add\" and/or \"git commit -a\")";
    newLine();
}

async function printGitCommitResponse() {
    span.innerHTML += "[main b2734b9] Initial commit<br>&nbsp;1 file changed, 4 insertions(+), 1 deletion(-)";
    newLine();
}

async function printGitPushResponse(lineDelay = 50) {
    const lines = [
        "Enumerating objects: 35, done.",
        "Counting objects: 100% (35/35), done.",
        "Delta compression using up to 8 threads",
        "Compressing objects: 100% (34/34), done.",
        "Writing objects: 100% (34/34), 65.72 KiB | 16.43 MiB/s, done.",
        "Total 34 (delta 13), reused 0 (delta 0), pack-reused 0",
        "remote: Resolving deltas: 100% (13/13), done.",
        "To github.com:marsa099/koderiet.git",
        "aad575d..1458f72  main -> main",
        "'main' set up to track remote branch 'main' from 'origin'."
    ];

    for (let i = 0; i < lines.length; i++) {
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        span.appendChild(document.createTextNode(lines[i]));
        newLine(false);
        await sleep(rand * lineDelay);
    }

    newLine();
}

async function finalGlowSequence() {
    const prefix = "$ cd ";
    const glowText = "koderiet.dev";

    // Type "$ cd " normally
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    await sleep(rand * delay * 5);

    // Create span for "$ cd " prefix
    const cdSpan = document.createElement('span');
    cdSpan.id = 'cd-prefix';
    cdSpan.classList.add('text');

    for (let i = 0; i < prefix.length; i++) {
        const charDelay = Math.floor(Math.random() * (max - min + 1) + min);
        cdSpan.innerHTML += prefix[i];
        await sleep(charDelay * delay);
    }

    span.appendChild(cdSpan);

    // Create special span for "koderiet.dev"
    const glowSpan = document.createElement('span');
    glowSpan.id = 'koderiet-glow';
    glowSpan.classList.add('text');

    // Type "koderiet.dev" into the special span
    for (let i = 0; i < glowText.length; i++) {
        const charDelay = Math.floor(Math.random() * (max - min + 1) + min);
        glowSpan.innerHTML += glowText[i];
        await sleep(charDelay * delay);
    }

    span.appendChild(glowSpan);

    // Wait 1 second after typing completes
    await sleep(1000);

    // Hide everything except "$ cd" prefix and koderiet.dev
    const dollarSign = document.querySelector('.dollarSign');
    if (dollarSign) dollarSign.style.display = 'none';
    if (blinkingCursor) blinkingCursor.style.visibility = 'hidden';
    span.innerHTML = ''; // Clear all previous content
    span.appendChild(cdSpan); // Keep the "$ cd" prefix
    span.appendChild(glowSpan); // Add the glow span

    // Wait a moment, then start gentle glow on koderiet.dev
    await sleep(500);
    glowSpan.classList.add('glow-initial');

    // Let the glow be visible for a bit, THEN start fading out "$ cd "
    await sleep(1000);
    cdSpan.classList.add('fade-out');

    // Wait for cd to fade out completely (1.5s transition)
    await sleep(1500);

    // Now position koderiet.dev absolutely at its EXACT current position
    // This is critical - we capture the position right before making it absolute
    const glowRect = glowSpan.getBoundingClientRect();
    const parentRect = span.getBoundingClientRect();
    const terminal = document.querySelector('.terminal');

    // Set a min-height on parent to prevent collapse when we position absolutely
    span.style.minHeight = `${span.offsetHeight}px`;

    // Position it absolutely at its current exact location
    glowSpan.style.position = 'absolute';
    glowSpan.style.left = `${glowRect.left - parentRect.left}px`;
    glowSpan.style.top = `${glowRect.top - parentRect.top}px`;

    // IMPORTANT: Calculate the final center position BEFORE triggering growth
    // We need to estimate the final width based on the font-size change
    const terminalWidth = terminal.offsetWidth;
    const terminalLeft = terminal.getBoundingClientRect().left;
    const parentLeft = parentRect.left;

    // Calculate approximate final width (5vw or 10vw font-size)
    // The text "koderiet.dev" is 12 characters
    const isMobile = window.innerWidth < 576;
    const finalFontSize = isMobile ? window.innerWidth * 0.1 : window.innerWidth * 0.05;
    const estimatedFinalWidth = finalFontSize * 12 * 0.6; // approximate character width ratio

    // Calculate center position for the final size
    const centerLeft = (terminalWidth / 2) - (estimatedFinalWidth / 2) - (terminalLeft - parentLeft);

    // Small delay to ensure position is set
    await sleep(50);

    // NOW set the final center position AND trigger growth at the same time
    // This way both font-size and position transition together smoothly
    glowSpan.style.left = `${centerLeft}px`;
    glowSpan.classList.remove('glow-initial');
    glowSpan.classList.add('glow-active');
}

const run = async () => {
    await sleep(1000);
    await typeCommand("git status");
    await printGitStatus();
    await sleep(300);
    await typeCommand("git add index.html");
    await typeCommand("git commit -m \"Initial commit\"");
    await sleep(200);
    await printGitCommitResponse();
    await typeCommand("git push origin main");
    await sleep(300);
    await printGitPushResponse();
    await sleep(500);
    await typeCommand("clear");
    span.innerHTML = '';

    // Hide the original dollar sign to prevent double $$
    const originalDollarSign = document.querySelector('.dollarSign');
    if (originalDollarSign) {
        originalDollarSign.style.display = 'none';
    }

    // Center the content after clear
    const mainElement = document.querySelector('.main');
    if (mainElement) {
        mainElement.classList.add('centered');
    }

    await sleep(500);
    await finalGlowSequence();
};

run();
