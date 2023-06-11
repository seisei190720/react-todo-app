// ajax関数	
export const ajax = 
(url: string,
 method = "GET",
 data: object | null,
 success: ((req: XMLHttpRequest) => void) | undefined | null = null,
 error: ((req: XMLHttpRequest) => void) | undefined | null = null, 
 sync = true): void => {
  
    let xhr = new XMLHttpRequest();
    let json = "";
    // 非同期の状態の更新イベント
    xhr.onreadystatechange = (e) => {
      let req = e.target as XMLHttpRequest;
      if (req == null) {
        return;
      }
      // 非同期処理が完了すれば(Code state - 4)
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          if (success !== null && success !== undefined) {
            success.call(this, req);
          }
        } else {
          if (error !== null && error !== undefined) {
            error.call(this, req);
          }
        }
      }
    }
    if (data != null) {
      json = JSON.stringify(data);
    }
  
    // XMLHttpRequest基本設定/
    xhr.open(method, url, sync);
    // XMLHttpRequestヘッダー設定
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    // 非同期通信開始
    xhr.send(json);
  };
  
  export default ajax;