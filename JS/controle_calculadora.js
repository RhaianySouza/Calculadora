function selectQuery(tag){
	return document.querySelector(tag);
}
function selectQueryAll(tag){
	return document.querySelectorAll(tag);
}
class calculator{
	constructor(previous,previousCurrent){
		this.previous = previous;
		this.previousCurrent = previousCurrent;
		this.currentOp = "";
	}
	//show digit
	addDigit(d){
		this.currentOp = d;
		if(this.previous.value.includes(".")==true && this.currentOp=='.'){
			return
		}else{
			this.updateScreen();
		}

	}
	operation(d){
		if(this.previous.value==="" && d!="C"){
			if(this.previousCurrent.innerText!==""){
				this.changeOperation(d);
			}
			return;
		}
		let op;
		const input = +this.previous.value;
		const memory = +this.previousCurrent.innerText.split(' ')[0];
		console.log(`${input} ${memory}`);
		
		switch(d){
			case "C":
				this.opClearAll()
				break
			case "CE":
				this.opClear()
				break
			case "/":
				op = memory / input;
				this.updateScreen(op,d,memory,input);
				break
			case "*":
				op = memory * input;
				this.updateScreen(op,d,memory,input);
				break
			case "+":
				op = memory + input;
				this.updateScreen(op,d,memory,input);
				break
			case "-":
				op = memory - input;
				this.updateScreen(op,d,memory,input);
				break
			case "=":
				this.opEqual()
				break
			
			case "DEL":
				this.opDel();
				break
		}
	}
	changeOperation(op){
		const mathOp = ["*","/","+","-"];
		if(!mathOp.includes(op)){
			return
		};
		if(+this.previousCurrent.innerText.at(-1)>=0){
			this.previousCurrent.innerText += ' '+op;
		}else{
			this.previousCurrent.innerText = this.previousCurrent.innerText.slice(0,-1) + op;
		}
	}
	opDel(){
		this.previous.value = this.previous.value.slice(0,-1);
	}
	opClear(){
		this.previous.value = "";
	}
	opClearAll(){
		this.previous.value = "";
		this.previousCurrent.innerText = "0";
	}
	opEqual(){
		const op = this.previousCurrent.innerText.split(' ')[1];
		this.operation(op);
		this.previousCurrent.innerText = this.previousCurrent.innerText.slice(0,-1)
	}
	updateScreen(value=null,op=null,current=null,previous=null){
		if(value===null){
			this.previous.value+= this.currentOp;
		}else{
			if(current===0){
				value = previous
			}
			this.previousCurrent.innerText = `${value} ${op}`;
			this.previous.value = '';
		}
		
	}
	
}
const c = new calculator(selectQuery("#visor"),selectQuery("#previousCurrent"));
Array.from(selectQueryAll("#comandos button")).forEach((btn) => {
	btn.addEventListener("click", (e) =>{
		const value = e.target.innerText;
		if(+value>=0 || value=='.'){
			c.addDigit(value)
		}else{
			c.operation(value);
		}
	});
});