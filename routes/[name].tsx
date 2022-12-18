import { Handlers, PageProps } from "$fresh/server.ts";

interface Response {
  section: string;
  term: string;
  courseTitle: string;
  instructor: string;
  grades: { [key: string]: number };
}

export const handler: Handlers<Response[] | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(
      `https://gradus.jiechen.dev/api/all/?query=${name}&field=section`
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: Response[] = await resp.json();
    return ctx.render(user);
  },
};

const tally = (arr: Response[]) => {
  const total: { [key: string]: number } = {};
  arr.forEach((r) => {
    Object.keys(r.grades).forEach((e) => {
      if (e in total) {
        total[e] = total[e] + r.grades[e];
      } else {
        total[e] = r.grades[e];
      }
    });
  });
  return total;
};

export default function Greet(props: PageProps) {
  const { data } = props;
  const parsed: { [key: string]: Response[] } = {};

  data.forEach((element: Response) => {
    const { instructor } = element;
    if (!(instructor in parsed)) {
      parsed[instructor] = [element];
    } else {
      parsed[instructor].push(element);
    }
  });

  console.log();

  const accGrades = Object.keys(parsed).map((k) => {
    const total = tally(parsed[k]);
    // console.log(k);
    // console.log(total);
    return (
      <li>
        <div>{k}</div>
        <img src="/chart" />
      </li>
    );
  });

  return (
    <div>
      <ul>{accGrades}</ul>
    </div>
  );
}
