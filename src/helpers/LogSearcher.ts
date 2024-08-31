export interface ClefLogRow {
  Timestamp: Date;
  Level: string;
  MessageTemplate: string;
  RenderedMessage?: string;
  Properties?: Record<string, any>;

  [key: string]: any;
}

export interface LogFile {
  filename: string;
  content: ClefLogRow[];
  date?: Date;
}

interface ClefLogInput {
  '@l': string
  '@mt': string
  '@t': string

  [key: string]: string | number;
}


export class LogParser {
  parseLogFileContent(fileContent: string): LogFile {
    const preparsedLogs: ClefLogInput[] = [];
    // Split the content by newlines to get each JSON string
    const lines = fileContent.split('\r\n');
    // Parse each line into a JSON object, filtering out empty lines
    const jsonObjects = lines
      .filter(line => line.trim() !== '') // filter out empty lines
      .map((line) => JSON.parse(line)); // parse each line

    preparsedLogs.push(...jsonObjects);

    return {
      filename: 'test',
      content: preparsedLogs.map(log => {
        return {
          Timestamp: new Date(log['@t']),
          Level: log['@l'],
          MessageTemplate: log['@mt'],
          Properties: log,
          RenderedMessage: replaceMessageTemplate(log['@mt'], log),
        }
      }),
    }
  }
}

export class LogSearcher extends LogParser {
  searchLogs(fileContents: string[], searchTerm: string) {
    const timeline: ClefLogRow[] = [];

    fileContents.forEach(fileContent => {
      const logs: ClefLogRow[] = JSON.parse(fileContent);

      logs.forEach(log => {
        if (log.RenderedMessage && log.RenderedMessage.includes(searchTerm)) {
          timeline.push(log);
        } else if (log.MessageTemplate && log.MessageTemplate.includes(searchTerm)) {
          timeline.push(log);
        }
      });
    });

    // Sort the timeline by the Timestamp
    timeline.sort((a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime());

    return timeline;
  }
}


const replaceMessageTemplate = (message: string, meta: Record<string, any>): string => {
  return message.replace(/{([^}]+)}/g, (match, key) => {
    return meta[key] !== undefined && meta[key] !== '' ? meta[key] : match;
  });
};