/**
 * ComicCraft - AI Comic Story Creator
 * Frontend Interaction and Animation Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const comicForm = document.getElementById('comic-form');
  const generateBtn = document.getElementById('btn-generate');
  const loadingOverlay = document.getElementById('loading-overlay');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const stageItems = document.querySelectorAll('.stage-item');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Input Fields
  const storyPromptInput = document.getElementById('story_prompt');
  const characterNameInput = document.getElementById('character_name');
  const settingSelect = document.getElementById('setting');
  const toneSelect = document.getElementById('tone');
  const artStyleSelect = document.getElementById('art_style');

  let isSubmitting = false;
  let progressInterval = null;

  // Preset Story Ideas
  const presets = {
    fox: {
      prompt: 'A brave young fox ventures into an ancient glowing forest to find a legendary star fragment.',
      character: 'Leo',
      setting: 'Forest',
      tone: 'Adventure',
      style: 'Comic Book',
      panels: 5
    },
    cyber: {
      prompt: 'A rogue detective investigates a mysterious neon blackout across the futuristic metropolis of Neo-Veridia.',
      character: 'Dexter',
      setting: 'City',
      tone: 'Mystery',
      style: 'Anime',
      panels: 5
    },
    space: {
      prompt: 'An astronaut explorer navigates an alien asteroid belt to decipher cosmic signals sent from a forgotten civilization.',
      character: 'Captain Maya',
      setting: 'Space',
      tone: 'Dramatic',
      style: 'Realistic',
      panels: 6
    },
    academy: {
      prompt: 'A student discovers that the academy library contains spellbooks that spring to life after midnight.',
      character: 'Tara',
      setting: 'School',
      tone: 'Funny',
      style: 'Cartoon',
      panels: 5
    },
    fantasy: {
      prompt: 'A blacksmith apprentice discovers their hammer can forge weapons out of fallen dragon scales.',
      character: 'Kael',
      setting: 'Fantasy World',
      tone: 'Adventure',
      style: 'Fantasy',
      panels: 6
    }
  };

  // Preset button click handling
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const presetKey = btn.dataset.preset;
      const data = presets[presetKey];
      if (!data) return;

      if (storyPromptInput) storyPromptInput.value = data.prompt;
      if (characterNameInput) characterNameInput.value = data.character;
      if (settingSelect) settingSelect.value = data.setting;
      if (toneSelect) toneSelect.value = data.tone;
      if (artStyleSelect) artStyleSelect.value = data.style;

      // Select panel count radio
      const panelRadio = document.querySelector(`input[name="panel_count"][value="${data.panels}"]`);
      if (panelRadio) panelRadio.checked = true;

      // Highlight the prompt field briefly
      if (storyPromptInput) {
        storyPromptInput.focus();
        storyPromptInput.style.borderColor = 'var(--comic-yellow)';
        setTimeout(() => {
          storyPromptInput.style.borderColor = '';
        }, 800);
      }
    });
  });

  // Stages progression schedule
  const stagesSchedule = [
    { stage: 0, delay: 0, percent: 18, label: 'Understanding your story...' },
    { stage: 1, delay: 1800, percent: 35, label: 'Creating comic outline...' },
    { stage: 2, delay: 3800, percent: 52, label: 'Writing dialogue...' },
    { stage: 3, delay: 6200, percent: 75, label: 'Creating illustrations...' },
    { stage: 4, delay: 9500, percent: 88, label: 'Building comic layout...' },
    { stage: 5, delay: 12000, percent: 96, label: 'Preparing PDF...' },
  ];

  function runProgressAnimation() {
    if (!progressBarFill || !stageItems.length) return;

    stagesSchedule.forEach((item, index) => {
      setTimeout(() => {
        if (!isSubmitting) return;

        // Update progress bar
        progressBarFill.style.width = `${item.percent}%`;

        // Update stage indicators
        stageItems.forEach((stageEl, sIdx) => {
          if (sIdx < index) {
            stageEl.classList.remove('active');
            stageEl.classList.add('completed');
            const icon = stageEl.querySelector('.stage-icon');
            if (icon) icon.innerHTML = '&#10003;';
          } else if (sIdx === index) {
            stageEl.classList.add('active');
            stageEl.classList.remove('completed');
            const icon = stageEl.querySelector('.stage-icon');
            if (icon) icon.textContent = `${sIdx + 1}`;
          } else {
            stageEl.classList.remove('active', 'completed');
            const icon = stageEl.querySelector('.stage-icon');
            if (icon) icon.textContent = `${sIdx + 1}`;
          }
        });
      }, item.delay);
    });
  }

  // Form submission handler
  if (comicForm) {
    comicForm.addEventListener('submit', (e) => {
      // 1. Prevent multiple submits
      if (isSubmitting) {
        e.preventDefault();
        return;
      }

      // 2. Validate fields
      const promptVal = (storyPromptInput?.value || '').trim();
      const characterVal = (characterNameInput?.value || '').trim();

      if (!promptVal || promptVal.length < 3) {
        e.preventDefault();
        alert('Please enter a story idea (minimum 3 characters).');
        if (storyPromptInput) storyPromptInput.focus();
        return;
      }

      if (promptVal.length > 500) {
        e.preventDefault();
        alert('Story prompt is too long. Please keep it under 500 characters.');
        if (storyPromptInput) storyPromptInput.focus();
        return;
      }

      if (!characterVal) {
        e.preventDefault();
        alert('Please enter a main character name.');
        if (characterNameInput) characterNameInput.focus();
        return;
      }

      // 3. Mark submitting state
      isSubmitting = true;
      if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span>⚡ Crafting Your Comic...</span>';
      }

      // 4. Activate loading overlay
      if (loadingOverlay) {
        loadingOverlay.classList.add('active');
        runProgressAnimation();
      }

      // Simulate completion and redirect to preview page
      e.preventDefault();
      setTimeout(() => {
        window.location.href = 'comic_preview.html';
      }, 13000); // Redirect after animation completes
    });
  }
});
