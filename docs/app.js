

// === SONIC-FORAGE EASTER EGGS ===
console.log('🍓 DJ Strawberry says: "The bass is strong with this one"');
console.log('🎛️ Unicode CDJ loaded — no pixels were harmed in the making of this deck');
console.log('🤖 Ralph Loop: I think therefore I... drop bass?');
console.log('⚡ Sonic-Forage: World's first autonomous DJ operating system');
console.log('🎮 Cheat codes at: /cheats/');

// Konami code listener
(function(){
  var konamiSequence = [38,38,40,40,37,39,37,39,66,65];
  var konamiIndex = 0;
  document.addEventListener('keydown', function(e){
    if(e.keyCode === konamiSequence[konamiIndex]){
      konamiIndex++;
      if(konamiIndex === konamiSequence.length){
        document.body.style.animation = 'rainbow 2s linear';
        console.log('🎮 KONAMI CODE ACTIVATED — MAXIMUM BASS MODE ENGAGED');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
})();
