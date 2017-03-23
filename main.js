var createProgrammer = function() {
	return {
  	languages: [],
    learnNewLanguage: function(value) {
    	this.languages.push(value);
    },
    isPragmatic: function() {
    	return this.languages.length >= 3
    }
  }
}

var programmer = new createProgrammer();
programmer.learnNewLanguage("Clojure");
console.log(programmer.isPragmatic())
programmer.learnNewLanguage("Java");
programmer.learnNewLanguage("Go");
console.log(programmer.isPragmatic())
console.log(programmer);