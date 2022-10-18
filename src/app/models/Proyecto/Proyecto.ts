import { Asesor } from "../Asesor/Asesor";
import { Join } from "../join";

export class Proyecto {
  public Id: String = "";
  public NombreCompleto: String = "";
  public Correo: String = "";
  public Telefono: String = "";
  public Telefono2: String = "";
  public OrigenId: String = "";
  public ProyectoId: String = "";
  public AsesorId: String = "";
  public Estado: String = "";
  public FechaCreacion: String = "";
  public FechaModificacion: String = "";
  public Origen!: Join;
  public Proyecto!: Join;
  public Asesor!: Asesor;
}

export class tablaProyecto {
  public count: number = 0;
  public rows!: Proyecto[];
}
