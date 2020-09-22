import React from 'react';
import RecipeCard from './RecipeCard';
import data from './recipes.json';

class Recipes extends React.Component{
  constructor(props){
    super(props);
    this.state={
      recipes: data,
      editableIngredients : []};
  }
  componentDidMount(){
  }
  storageAvailable(){
    try {
        localStorage.setItem("temp", "temp");
        localStorage.removeItem("temp");
        return true;
    } catch(e) {
        return false;
    }
}
componentWillMount() {
    if (this.storageAvailable()) {
        const localRef = localStorage.getItem('recipes',JSON.stringify(this.state.recipes));
        if (localRef) {
            this.setState({
                recipes: JSON.parse(localRef)
            })
        }
    } else {
        console.error('Your browser doesn\'t support local storage');
    }
}
componentWillUpdate(nextProps, nextState) {
    if (this.storageAvailable('localStorage')) {
        const ref = localStorage.setItem('recipes',JSON.stringify(nextState.recipes))
    } else {
        console.error('Your browser doesn\'t support local storage');
    }
}
  addForm = () => {
    return(
      <div id={`newRecipe`} className="modal fade">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
          <div class="modal-header">
        <center><h1>New Recipe</h1></center>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div className="addForm">
            <div className="form-group">
                <label>Titre:</label>
                <input type="text" className="form-control input-new" id="newTitle" /><br/>
                <label>Image:</label>
                <input type="text" className="form-control input-new" id="newImage" /><br/>
                <label>Description:</label>
                <textarea className="form-control input-new" id="newDescription" /><br/>
                <label>Temps de Préparation:</label>
                <input type="number" className="form-control input-new" id="newTime" /><br/>
                <label>Ingredients: </label>
                <table className="table table-striped" id="newRecipe-Table">
                {this.state.editableIngredients.map((content,index) => {
                return ( <tr><td> {
                        <li className={`add-Ingredients`} contenteditable="true">{content}</li>
                        } </td><td><a href="#" className="text-danger" onClick={()=>this.deleteIngredientRow(index)}><i
                        className="fa fa-minus fa-sm float-right"></i></a></td></tr>);})}
                  <tr><td></td><td><a href="#" onClick={()=>this.addIngredientRow()} className="text-success"><i
            className="fa fa-plus fa-sm float-right"></i></a></td></tr>
                </table>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" className="btn btn-primary mb-2" onClick={()=>this.handleNewRecipe()}>Add</button>
        </div>
        </div>
        </div>
    </div>
</div>
    )
  }
  handleNewRecipe(){
    var forms = document.getElementsByClassName("input-new");
            let valid = true;
            Array.prototype.forEach.call(forms, function(e) {
                if(e.value==""){
                    e.classList.add("is-invalid");
                    valid = false;
                }
                else{
                    e.classList.remove("is-invalid");
                }
            });
            Array.prototype.forEach.call(document.getElementsByClassName("add-Ingredients"), function(e) {
                if(e.textContent==""||e.textContent=="_"){
                    e.classList.add("is-invalid");
                    valid = false;
                }
                else{
                    e.classList.remove("is-invalid");
                }
            });
            if(valid){
    var ingredients = [];
    Array.prototype.forEach.call(document.getElementsByClassName("add-Ingredients"), function(e) {
      ingredients.push(e.textContent);
  });
  console.log(ingredients);
    var recipe = {
      title: document.getElementById("newTitle").value,
      image: document.getElementById("newImage").value,
      description: document.getElementById("newDescription").value,
      time: document.getElementById("newTime").value,
      ingredients
    };
    Array.prototype.forEach.call(forms, function(e) {
            e.value="";
            });
            this.setState({
              editableIngredients : []
          });
    this.addRecipe(recipe);
    document.getElementsByClassName("close")[0].click();
  }
  }
  addIngredientRow(){
    this.setState({
        editableIngredients : [...this.state.editableIngredients,"_"]
    });
}
deleteIngredientRow(index){
    let editableIngredients = [...this.state.editableIngredients];
    editableIngredients.splice(index,1);
    this.setState({
        editableIngredients : [...editableIngredients]
    });
}
  addRecipe(recipe){
    const recipes = {...this.state.recipes};
    const last = Date.now();
    recipe.recipeID = `recipe${last}`;
    recipes[`recipe${last}`] = recipe;
    this.setState({recipes});
  }
  deleteRecipe(recipeID){
    const recipes = {...this.state.recipes};
    delete recipes[recipeID];
    this.setState({recipes});
  }
  editRecipe(recipe){
    var recipes = {...this.state.recipes};
    recipes[recipe.recipeID].title=recipe.title;
    recipes[recipe.recipeID].image=recipe.image;
    recipes[recipe.recipeID].description=recipe.description;
    recipes[recipe.recipeID].time=recipe.time;
    recipes[recipe.recipeID].ingredients=recipe.ingredients;
    this.setState({recipes})
  }
  render(){
    let recipes = [];
    for(const key of (Object.keys(this.state.recipes))){
    recipes.push(<RecipeCard key={key} recipe={this.state.recipes[key]} deleteFunction={()=>{this.deleteRecipe(key)}} 
    editFunction={(recipe)=>{this.editRecipe(recipe)}} />);
}
return [<>{this.addForm()}</>,recipes];
  }
//    return recipes.map(e => <RecipeCard recipe={recipes[e]} />);
}
export default Recipes;
