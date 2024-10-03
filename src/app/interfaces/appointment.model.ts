import {NodeModel} from "./node.model";
import {PageModel} from "./page.model";

export interface AppointmentModel {
  nodes: NodeModel[];
  page: PageModel;
}
