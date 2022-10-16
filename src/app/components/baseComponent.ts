
export class BaseFormComponent {
  public latin: RegExp = /^[\wÀ-ú\s]+$/;
  public number: RegExp = /^[0-9]+$/;
  public loadingMain: boolean = false;
  public loading: boolean = false;
}
