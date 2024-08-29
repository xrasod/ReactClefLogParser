
interface ClefLog {
  Timestamp: string;
  Level: string;
  MessageTemplate: string;
  RenderedMessage?: string;
  Properties?: Record<string, any>;

  [key: string]: any;
}

interface ClefLogInput {
  '@l': string
  '@mt': string
  '@t': string
  [key: string]: string | number;
}

export class LogParser {
  protected logLevelCounts: Record<string, number> = {};

  parseLogFileContent(fileContent: string) {
    const logs: ClefLogInput[] = [];
    // Split the content by newlines to get each JSON string
    const lines = fileContent.split('\r\n');
    // Parse each line into a JSON object, filtering out empty lines
    const jsonObjects = lines
      .filter(line => line.trim() !== '') // filter out empty lines
      .map((line) => JSON.parse(line)); // parse each line
    
    logs.push(...jsonObjects);

    logs.forEach(log => {
      const level = log['@l'];
      if (this.logLevelCounts[level]) {
        this.logLevelCounts[level]++;
      } else {
        this.logLevelCounts[level] = 1;
      }
    });
  }

  getLogLevelCounts() {
    return this.logLevelCounts;
  }
}

export class LogSearcher extends LogParser {
  searchLogs(fileContents: string[], searchTerm: string) {
    const timeline: ClefLog[] = [];

    fileContents.forEach(fileContent => {
      const logs: ClefLog[] = JSON.parse(fileContent);

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
