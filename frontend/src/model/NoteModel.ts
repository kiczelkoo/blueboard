
export class NoteModel {

  message = "message from note model!";
  handleCssClass: String;
  targetCssClass: String;

  constructor(handleCssClass: String, targetCssClass: String) {
    this.handleCssClass = handleCssClass;
    this.targetCssClass = targetCssClass;
  }


}
