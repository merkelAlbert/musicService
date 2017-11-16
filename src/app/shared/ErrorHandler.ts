export class ErrorHandler {
  public static handleError(error: any) {
    switch (error.status) {
      case 200: {
        alert('все норм типо');
        break;
      }
      case 400: {
        alert('файл поменяй, мудила');
        break;
      }
      case 404: {
        alert('-серв');
        break;
      }
    }
  }
}
