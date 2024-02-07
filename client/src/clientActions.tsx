import axios from 'axios';

class clientActions {

  static async createApplication(appData:any) {
    const response = axios.post(`http://localhost:8000/applications/`, {
        ...appData
    }).then(function (response) {
        console.log(response);
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
    return response
  }

  static async getApplication(appId: string) {
    const response = axios.get(`http://localhost:8000/applications/${appId}`)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
      return response
  }

  static async saveApplication(appData:any, appId:any) {
    const response = axios.put(`http://localhost:8000/applications/${appId}`, {
        ...appData
    }).then(function (response) {
        console.log(response);
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
      return response
  }

  static async submitApplication(appId:any) {
    const response = axios.post(`http://localhost:8000/applications/${appId}/submit`, {
      isSubmitted: true,
      id: appId
    }).then(function (response) {
        console.log(response);
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
      return response
  }



}

export default clientActions;