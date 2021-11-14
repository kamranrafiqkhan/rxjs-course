import { Observable } from "rxjs";

export function createHttpObserveable(url: string): Observable<any> {
  return Observable.create((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal })
      .then((response) => {
        if (response.ok)
          return response.json();
        else
          observer.error(response.status + ": Error Occurred")
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
    return () => controller.abort();
  });
}
