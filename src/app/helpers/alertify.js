// @ts-ignore
let numberOfToasts = 0;
export const handleAlert = async (
    status, 
    message, 
    toastTime = 3, 
    toastCount = 1
) => {
    if (typeof document !== 'undefined') {
        if (numberOfToasts < toastCount) {
            const alertifyjs = await import('alertifyjs');
            numberOfToasts++;
            alertifyjs[status](message, toastTime, () => {
              numberOfToasts--;
            });
          } 
    }
}
export const handleConfirm = async (
  message, 
  onConfirm, 
  onCancel, 
  title = 'Confirm',
  confirmText = 'OK', 
  cancelText = 'Cancel'
) => {
  if (typeof document !== 'undefined') {
      const alertifyjs = await import('alertifyjs');
      alertifyjs.confirm(title, message, 
        onConfirm, 
        onCancel)
          .set('labels', { ok: confirmText, cancel: cancelText });
  }
}
export const handlePrompt = async (
  title = 'Confirm',
  value,
  onConfirm, 
  onCancel, 
  confirmText = 'OK', 
  cancelText = 'Cancel'
) => {
  if (typeof document !== 'undefined') {
      const alertifyjs = await import('alertifyjs');
      alertifyjs.prompt(title, value,
        onConfirm,
        onCancel)
        .set('labels', { ok: confirmText, cancel: cancelText })
  }
}