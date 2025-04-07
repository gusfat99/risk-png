import axios from 'axios';

export default async function fetchFileViaProxy(remoteUrl: string, filename?: string): Promise<File> {
  const proxyUrl = `/api/proxy-file?url=${(remoteUrl)}`;

  const response = await axios.get(proxyUrl, {
    responseType: 'blob',
  });

  const contentType = response.headers['content-type'] || 'application/octet-stream';
  const blob = response.data as Blob;
  const finalFilename = filename || remoteUrl.split('/').pop() || 'downloaded_file';

  return new File([blob], finalFilename, { type: contentType });
}
