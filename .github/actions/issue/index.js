const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const token = core.getInput('token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const assignees = core.getInput('assignees');

    const octokit = github.getOctokit(token);
    const response = await octokit.issues.create({
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split('\n') : undefined,
    });

    core.setOutput('issue', JSON.stringify(response.data, null, '\t'));
  } catch (error) {
    core.setFailed(error.message);
  }
})();
