import React from 'react';
class RecipeCard extends React.Component {
        constructor(props) {
            super(props);
            this.recipe = props.recipe;
            this.recipeID = this.recipe.recipeID;
            this.ingredients = this.recipe.ingredients;
            this.state={editableIngredients : [...this.ingredients]};
        }
        componentDidUpdate(){
        }
        ingredientsTable = () => {
            return(
                <div id={`ingredients${this.recipeID}`} className="modal fade">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                    <div class="modal-header"><center><h3>{this.recipe.title}</h3></center>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button></div>
                    <div class="modal-body"><div className="ingredients">
                        <h5>Ingredients: </h5>
                        < table className="table table-striped">
                            <tbody>{this.ingredients.map(i => {
                return ( <tr><td> {
                        <li>{i}</li>
                        } </td></tr>);})}</tbody>
                            </table>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            );
        }
        editingForm = () => {
            return(
                <div id={`edit${this.recipeID}`} className="modal fade">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <center><h1>{this.recipe.title}</h1></center>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <div className="editForm">
                            <div className="form-group">
                                <label>Titre:</label>
                                <input type="text" className={`form-control input-${this.recipeID}`} id={`editTitle${this.recipeID}`} defaultValue={this.recipe.title}/><br/>
                                <label>Image:</label>
                                <input type="text" className={`form-control input-${this.recipeID}`} id={`editImage${this.recipeID}`} defaultValue={this.recipe.image}/><br/>
                                <label>Description:</label>
                                <textarea className={`form-control input-${this.recipeID}`} id={`editDescription${this.recipeID}`} defaultValue={this.recipe.description}/><br/>
                                <label>Temps de Préparation:</label>
                                <input type="number" className={`form-control input-${this.recipeID}`} id={`editTime${this.recipeID}`} defaultValue={this.recipe.time}/><br/>
                                <label>Ingredients: </label>
                <table className="table table-striped" id={`editIngredients${this.recipeID}`}>{this.state.editableIngredients.map((content,index) => {
                return ( <tr><td> {
                        <li className={`editableIngredient${this.recipeID}`} contenteditable="true">{content}</li>
                        } </td><td><a href="#" className="text-danger" onClick={()=>this.deleteIngredientRow(index)}><i
                        className="fa fa-minus fa-sm float-right"></i></a></td></tr>);})}
                        <tr><td></td><td><a href="#" onClick={()=>this.addIngredientRow()} className="text-success"><i
            className="fa fa-plus fa-sm float-right"></i></a></td></tr>
                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.handleEditRecipe()}} data-dismiss="modal">Edit</button>
                    </div>
                    </div>
                </div>
                    </div>
            );
        }
        recipeCard = () =>{
            return(
                <div className="col-md-4 p-3">
                <div className="recipeCard">
                    <button type="button" className="btn btn-warning btn-rounded" onClick={()=>this.refreshEditableIngredients()} data-toggle="modal" data-target={`#edit${this.recipeID}`} >
                        < i style={ { "color": "white" } } className="fa fa-pencil-square-o fa-lg"> </i>
                    </button>
                    <button type="button" className="btn btn-danger btn-rounded" onClick={()=>this.props.deleteFunction()} >
                        < i className="fa fa-minus fa-lg"> </i>
                    </button>
                </div>
                <div className="card box-shadow">
                    <img className="card-img-top" src={ this.recipe.image }/>
                    <div className="card-body">
                        <center>
                            <h6> {
                                this.recipe.title
                            } </h6> </center>
                        <div className="card-text"> { this.recipe.description }
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="Empty"></div>
                                <small className="text-muted timeText">Total Time: {
                                this.recipe.time
                            } {
                                this.recipe.time !== "1" ? "mins" : "min"
                            } </small> </div>
                        </div>
                        <center>
                            <a href="#" className = "btn btn-primary stretched-link ingredientsButton" data-toggle="modal" data-target={`#ingredients${this.recipeID}`} > Ingredients </a> </center>
                    </div>
                </div>
            </div>
            );
        }
        refreshEditableIngredients(){
            let editableIngredients = [...this.ingredients];
            this.setState({editableIngredients});
            
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
        handleEditRecipe(){
            var forms = document.getElementsByClassName("input-"+this.recipeID);
            let valid = true;
            Array.prototype.forEach.call(forms, function(e) {
                if(e.value=="" || e.value == "_"){
                    e.classList.add("is-invalid");
                    valid = false;
                }
                else{
                    e.classList.remove("is-invalid");
                }
            });
            if(valid){
                var ingredients = [];
                Array.prototype.forEach.call(document.getElementsByClassName("editableIngredient"+this.recipeID), function(e) {
                    ingredients.push(e.textContent);
                });
                console.log(ingredients);
            var recipe = {
                recipeID: this.recipeID,
                title: document.getElementById("editTitle" + this.recipeID).value,
                image: document.getElementById("editImage" + this.recipeID).value,
                description: document.getElementById("editDescription" + this.recipeID).value,
                time: document.getElementById("editTime" + this.recipeID).value,
                ingredients
            };
            this.props.editFunction(recipe);
        }
        }
        render() {
            return [
            <>{this.editingForm()}</>,
            <>{this.ingredientsTable()}</>,
            <>{this.recipeCard()}</>
        ];
            }
                            }
export default RecipeCard;