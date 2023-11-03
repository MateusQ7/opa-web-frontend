import { BackReponse } from "src/app/user-register/backReponse.interface";

export interface PopUp{

  showPopUp():void;

  addMessageToPopUp(message:BackReponse):void

}
