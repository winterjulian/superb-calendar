import {ContactModel} from "./contact.model";
import {PropertyModel} from "./property.model";

export interface NodeModel {
  id: string;
  date: string;
  maxInviteeCount: number;
  attendeeCount: number;
  showContactInformation: boolean;
  contact: ContactModel;
  property: PropertyModel;
}
